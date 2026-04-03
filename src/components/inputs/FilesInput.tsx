import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
    FiUpload, 
    FiImage, 
    FiVideo, 
    FiFileText,
    FiFolder,
    FiX,
} from 'react-icons/fi';
import type { FilesInputProps, FileTypeConfig } from '../../types/propsTypes';
import { IoMdImages } from 'react-icons/io';
import { GiFilmStrip } from 'react-icons/gi';
import { PiFiles } from 'react-icons/pi';
import { LuFileMusic } from 'react-icons/lu';
import Label from './Label';
import ErrorField from './ErrorField';

const getFileTypeConfig = (fileType: string, allowMultiple: boolean = false, customConfig?: Partial<FileTypeConfig>): FileTypeConfig => {

    const configs: Record<string, FileTypeConfig> = {
        image: {
            icon: allowMultiple ? IoMdImages : FiImage,
            text: allowMultiple 
                ? 'Drag and drop images here or click to select multiple images'
                : 'Drag and drop an image here or click to select',
            acceptedTypes: 'image/*',
            maxSize: 10
        },
        video: {
            icon: allowMultiple ? GiFilmStrip : FiVideo,
            text: allowMultiple 
                ? 'Drag and drop videos here or click to select multiple videos'
                : 'Drag and drop a video here or click to select',
            acceptedTypes: 'video/*',
            maxSize: 100
        },
        document: {
            icon: allowMultiple ? PiFiles : FiFileText,
            text: allowMultiple 
                ? 'Drag and drop documents here or click to select multiple documents'
                : 'Drag and drop a document here or click to select',
            acceptedTypes: '.pdf,.doc,.docx,.txt,.rtf',
            maxSize: 20
        },
        audio: {
            icon: LuFileMusic,
            text: allowMultiple 
                ? 'Drag and drop audio files here or click to select multiple audio files'
                : 'Drag and drop an audio file here or click to select',
            acceptedTypes: 'audio/*',
            maxSize: 50
        },
        multiple: {
            icon: FiFolder,
            text: 'Drag and drop files here or click to select',
            acceptedTypes: '*/*',
            maxSize: 50
        },
        any: {
            icon: FiUpload,
            text: 'Drag and drop any file here or click to select',
            acceptedTypes: '*/*',
            maxSize: 50
        }
    };

    const defaultConfig = configs[fileType] || configs.any;
    return {
        ...defaultConfig,
        ...customConfig
    };

};

const getUserFriendlyErrorMessage = (acceptedTypes: string): string => {

    const fileTypeMessages: Record<string, string> = {
        'image/*': 'Please select an image file (JPG, PNG, GIF, WebP, etc.)',
        'video/*': 'Please select a video file (MP4, AVI, MOV, etc.)',
        'audio/*': 'Please select an audio file (MP3, WAV, etc.)',
        '.pdf,.doc,.docx,.txt,.rtf': 'Please select a document file (PDF, Word, or text file)',
        '*/*': 'Please select a valid file'
    };

    // Check for exact matches first
    if (fileTypeMessages[acceptedTypes]) {
        return fileTypeMessages[acceptedTypes];
    }

    // Handle specific file extensions
    if (acceptedTypes.includes(',')) {
        const extensions = acceptedTypes.split(',').map(ext => ext.trim().toUpperCase());
        const extensionList = extensions.join(', ');
        return `Please select a file with one of these formats: ${extensionList}`;
    }

    // Handle wildcard types
    if (acceptedTypes.includes('/*')) {
        const category = acceptedTypes.replace('/*', '').toUpperCase();
        return `Please select a ${category} file`;
    }

    // Fallback
    return 'Please select a valid file type';

};

export default function FilesInput({
    id,
    fileType,
    value,
    onFilesChange,
    maxFiles = 1,
    className = '',
    disabled = false,
    showPreview = true,
    customConfig,
    label,
    description,
    allowMultiple = false
}: FilesInputProps) {

    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const config = getFileTypeConfig(fileType, allowMultiple, customConfig);

    // Update selectedFiles when value prop changes
    useEffect(() => {
        if (value && value.length > 0) {
            setSelectedFiles(value);
        }
    }, [value]);

    const validateFile = useCallback((file: File): string | null => {

        if (config.maxSize && file.size > config.maxSize * 1024 * 1024) {
            return `File is too large. Maximum size allowed is ${config.maxSize} MB`;
        }

        if (config.acceptedTypes !== '*/*') {
            const acceptedTypes = config.acceptedTypes.split(',');
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            const mimeType = file.type;

            const isValidType = acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return fileExtension === type;
                } else if (type.includes('/*')) {
                    return mimeType.startsWith(type.replace('/*', '/'));
                }
                return mimeType === type;
            });

            if (!isValidType) {
                return getUserFriendlyErrorMessage(config.acceptedTypes);
            }
        }

        return null;

    }, [config]);

    const handleFiles = useCallback((files: FileList | File[]) => {

        const fileArray = Array.from(files);
        setError('');

        // إذا كان الرفع المتعدد مفعل، نتحقق من العدد الإجمالي
        const maxAllowedFiles = allowMultiple ? maxFiles : 1;
        
        if (fileArray.length > maxAllowedFiles) {
            setError(`You can only upload ${maxAllowedFiles} file${maxAllowedFiles > 1 ? 's' : ''} at a time`);
            return;
        }

        const validFiles: File[] = [];
        for (const file of fileArray) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
            validFiles.push(file);
        }

        setSelectedFiles(validFiles);
        onFilesChange(validFiles);

    }, [maxFiles, allowMultiple, validateFile, onFilesChange]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragOver(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {

        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }

    }, [disabled, handleFiles]);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    }, [handleFiles]);

    const handleClick = useCallback(() => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [disabled]);

    const removeFile = useCallback((index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        onFilesChange(newFiles);
    }, [selectedFiles, onFilesChange]);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const IconComponent = config.icon;

    // Get all files to display (from value prop or selected files)
    const allFiles = value && value.length > 0 ? value : selectedFiles;

    return <React.Fragment>
    
        <div className={`w-full !space-y-5`}>

            <Label id={id} label={label} description={description} />

            <div className={`w-full ${className}`}>

                {/* Upload area */}
                <div
                    className={`
                        relative border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all duration-300
                        ${isDragOver 
                            ? 'border-[var(--blue-color)] bg-[var(--blue-color)]/10' 
                            : 'border-[var(--gray-color)]'
                        }
                        ${disabled 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-[var(--gray-color)]/30'
                        }
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        id={id}
                        accept={config.acceptedTypes}
                        multiple={allowMultiple || maxFiles > 1}
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={disabled}
                    />

                    {allFiles.length === 0 && (
                        <div className="flex flex-col items-center space-y-2.5">

                            <IconComponent 
                                size={48} 
                                className={`${isDragOver ? 'text-[var(--blue-color)]' : 'text-[var(--secondary-color)] opacity-50'} duration-300`} 
                            />
                            
                            <div>

                                <p className={`text-base ${isDragOver ? 'text-[var(--blue-color)]' : 'text-[var(--secondary-color)]/50'} duration-300`}>
                                    {config.text}
                                </p>

                                {config.maxSize && (
                                    <p className="text-sm text-[var(--secondary-color)]/50 duration-300">
                                        Max size: {config.maxSize} MB
                                    </p>
                                )}

                                {(allowMultiple || maxFiles > 1) && (
                                    <p className="text-sm text-[var(--secondary-color)]/50 duration-300">
                                        Up to {maxFiles} files allowed
                                    </p>
                                )}

                            </div>

                        </div>
                    )}

                    {showPreview && allFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                            {allFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between gap-5 p-2.5 bg-[var(--gray-color)]/50 rounded-md">
                                    <div className="flex items-center space-x-3">
                                        <IconComponent size={20} className="text-[var(--secondary-color)]/50 shrink-0" />
                                        <div>
                                            <p className="text-sm text-start font-medium text-[var(--secondary-color)]">
                                                {file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}
                                            </p>
                                            <p className="text-xs text-start text-[var(--secondary-color)]/50">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>
                                    {!disabled && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(index);
                                            }}
                                            className="
                                                w-5 h-5 flex items-center justify-center rounded-full bg-[var(--secondary-color)]/30 
                                                cursor-pointer duration-300 hover:bg-[var(--secondary-color)]/40 shrink-0
                                            "
                                        >
                                            <FiX size={14} className="text-[var(--white-color)] shrink-0" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Error message */}
                {error && (
                    <ErrorField error={error} />
                )}

            </div>

        </div>

    </React.Fragment>;

}
