'use client'
import React, { useState } from 'react'
import axios from 'axios'
import styles from "./page.module.scss"
import { Field, FieldArray, Formik, Form } from 'formik';
import { ImageFile, FormValues } from '@/types/createNews';
import { categoryOptions } from './components/presets';
import CheckboxGroupFieldArray from './components/ChecboxGroupFieldArray';
import CustomField from './components/CustomField';
import ImageUploader from './components/ImageUploader';
import ImagesUploader from './components/ImagesUploader';
import ReactQuillField from './components/ReactQuillField';

const initialValues: FormValues = {
    title: '',
    subTitle: '',
    mainImg: null,
    images: [],
    section: [{ title: '', subTitle: '', description: '' }],
    category: '',
    tags: [],
    date: '',
    author: ''
};




const CreateNews = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [mainImg, setMainImg] = useState<File | null>(null);

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        const appendFormData = (key: string, value: any) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((val, index) => {
                    if (val instanceof File) {
                        formData.append(`${key}[${index}]`, val);
                    } else {
                        formData.append(`${key}[${index}]`, val);
                    }
                });
            }
            else {
                formData.append(key, value);
            }

        };

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key === 'mainImg') {
                formData.append('mainImg', mainImg || '');
            } else if (key === 'images') {
                (value as any[]).forEach((image: any, index: number) => {
                    formData.append(`images`, image);
                });
            } else if (key === 'section') {
                (value as any[]).forEach((section: any, index: number) => {
                    Object.entries(section).forEach(([sectionKey, sectionValue]) => {
                        appendFormData(`section[${index}][${sectionKey}]`, sectionValue);
                    });
                });
            } else {
                appendFormData(key, value);
            }
        });

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.data.message === "success") {
                setSuccess(true);
                console.log("Success");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || error.response?.err);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <main className={styles.createTour}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, isSubmitting, setFieldValue }) => (
                    <section className={styles.createTour__container}>
                        <Form className={styles.createTour__container_content}>
                            <CustomField name="title" setFieldValue={setFieldValue} label='title' fieldType="input" />
                            <ReactQuillField name="subTitle" label="Subtitle" value={values.subTitle} onChange={setFieldValue} />
                            <ImageUploader mainImg={mainImg} setMainImg={setMainImg} title='News Main'/>
                            <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                            <div className={styles.formField}>
                                <FieldArray name="section">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.section.map((section, index) => (
                                                <div key={index}>
                                                    <Field name={`section.${index}.title`} placeholder="Section Title" />
                                                    <Field name={`section.${index}.subTitle`} placeholder="Section Subtitle" />
                                                    <Field as="textarea" name={`section.${index}.description`} placeholder="Description" />

                                                    <button type="button" onClick={() => remove(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent default form submit action
                                                    console.log("Adding new section before push");
                                                    push({ title: '', subTitle: '', description: '' });
                                                    console.log("Adding new section after push");
                                                }}
                                            >
                                                Add Section
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>


                            </div>
                            <div className={styles.formField}>
                                <CheckboxGroupFieldArray name="tags" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.tags} />
                            </div>
                            <CustomField name="category" label="Category" fieldType="select" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} />
                            <input type="date" name="date" value={values.date} onChange={(e) => setFieldValue('date', e.target.value)} />
                            {/* Author   Field*/}
                            <CustomField name="author" setFieldValue={setFieldValue} label='author' fieldType="input" />
                            {error && <p className={styles.error}>{error}</p>}
                            <button type="submit" className={styles.submitButton} disabled={isSubmitting || loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    </section>
                )}
            </Formik>
        </main >
    )
}

export default CreateNews