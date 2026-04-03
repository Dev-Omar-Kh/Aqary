import React, { useState } from 'react'
import RegularInput from '../components/inputs/RegularInput'

export default function AddClient() {

    const [name, setName] = useState<string | undefined>();
    const [phone, setPhone] = useState<string | undefined>();

    return <React.Fragment>

        <section className='w-full co-px pt-10 pb-5 space-y-10'>

            <div className='flex flex-col gap-1.5'>
                <h1 className='text-4xl font-bold text-black max-[800px]:text-3xl'>تسجيل عميل جديد</h1>
                <p className='text-lg font-medium text-black/60 max-[800px]:text-base'>قم بتسجيل بيانات العميل لإدارة الدفعات بدقة وسرعة</p>
            </div>

            <form className='w-full p-5 bg-white rounded-xl grid grid-cols-2 gap-2.5 max-[800px]:grid-cols-1'>

                <RegularInput 
                    id={'name'} 
                    label='إسم العميل' 
                    placeholder='أدخل إسم العميل' 
                    description='يجب أن يكون الإسم رباعي'
                    type='text' 
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

            </form>

        </section>

    </React.Fragment>

}
