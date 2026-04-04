import React, { useState } from 'react';
import RegularInput from '../components/inputs/RegularInput';
import DateInput from '../components/inputs/DateInput';

// const formInputs = [

//     {
//         id: 1,
//         label: '',
//         placeholder: '',
//         type: '',
//         value: '',
//         onChange: '',
//         onBlur: '',
//         isRequired: '',
//         error: '',
//         className: '',
//         disabled: '',
//         autoComplete: '',
//         maxLength: '',
//         minLength: '',
//         pattern: '',
//         readOnly: '',
//         description: '',
//     }

// ]

export default function AddClient() {

    const [name, setName] = useState<string | undefined>();
    const [phone, setPhone] = useState<string | undefined>();
    const [price, setPrice] = useState<string | undefined>();
    const [date, setDate] = useState<string | undefined>();

    return <React.Fragment>

        <section className='w-full co-px pt-10 pb-5 space-y-10'>

            <div className='flex flex-col gap-1.5'>
                <h1 className='text-4xl font-bold text-black max-[800px]:text-3xl'>تسجيل عميل جديد</h1>
                <p className='text-lg font-medium text-black/60 max-[800px]:text-base'>قم بتسجيل بيانات العميل لإدارة الدفعات بدقة وسرعة</p>
            </div>

            <form className='w-full p-5 bg-white rounded-xl grid grid-cols-2 gap-x-5 gap-y-2.5 max-[800px]:grid-cols-1'>

                <RegularInput 
                    id={'name'} 
                    label='إسم العميل' 
                    placeholder='أدخل إسم العميل' 
                    description='يجب أن يكون الإسم رباعي'
                    type='text' 
                    // error='يجب ان يحتوي الاسم على اي حاجة'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <RegularInput 
                    id={'phone'} 
                    label='رقم الهاتف' 
                    placeholder='05X XXX XXXX'
                    description='يجب ان يكون الرقم متصلا بالواتساب'
                    type='text' 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className='col-span-2 max-[800px]:col-span-1'>

                    <RegularInput 
                        id={'price'} 
                        label='المبلغ المطلوب' 
                        placeholder='أدخل المبلغ المطلوب'
                        description='المبلغ المطلوب تحصيله شهريا (إيجار - أقساط)'
                        type='number' 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                </div>

                <DateInput
                    id="birthdate"
                    label="تاريخ التعاقد"
                    description='أدخل تاريخ بدء التعاقد مع العميل'
                    value={date}
                    onChange={(val) => setDate(val)} // e.g. "18-10-2020"
                    // error={errors.date}
                />

                <DateInput
                    id="birthdate"
                    label="تاريخ الإنهاء"
                    description='أدخل تاريخ نهاية التعاقد مع العميل'
                    value={date}
                    onChange={(val) => setDate(val)} // e.g. "18-10-2020"
                    // error={errors.date}
                />

                <button className='col-span-2 mt-2.5 p-2.5 rounded-lg bg-green text-black text-xl font-semibold cursor-pointer hover:text-white hover:bg-dark-green duration-300 max-[800px]:col-span-1'>تأكيد البيانات</button>

            </form>

        </section>

    </React.Fragment>

}
