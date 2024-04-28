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
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                // For nested objects like location
                Object.keys(value).forEach(subKey => {
                    formData.append(`${key}[${subKey}]`, value[subKey]);
                });
            } else if (Array.isArray(value)) {
                // For arrays like adultPricing, childrenPricing, options
                value.forEach((item, index) => {
                    if (typeof item === 'object') {
                        Object.keys(item).forEach(subKey => {
                            formData.append(`${key}[${index}][${subKey}]`, item[subKey].toString());
                        });
                    } else {
                        formData.append(`${key}[${index}]`, item);
                    }
                });
            } else {
                formData.append(key, value);
            }
        };

        const formData = new FormData();
        uploadedImages.forEach((file, index) => {
            formData.append(`images`, file.file);
        });
        if (mainImg) {
            formData.append('mainImg', mainImg);
        }

        values.section.forEach((section: { title: string, subTitle: string, description: string }, index: number) => {
            formData.append(`section[${index}].title`, section.title);
            formData.append(`section[${index}].subTitle`, section.subTitle);
            formData.append(`section[${index}].description`, section.description);
        });


        Object.keys(values).forEach(key => {
            if (key !== 'mainImg' && key !== 'images') {
                appendFormData(key, values[key]);
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
            if (response.status === 200) {
                setSuccess(true);
                // router.push('/');
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
                            <ImageUploader mainImg={mainImg} setMainImg={setMainImg} />
                            <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                            <div className={styles.formField}>
                                <FieldArray name="section">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.section.map((section: any, index: number) => (
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
                                                onClick={() => push({ title: '', subTitle: '', description: '' })}
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