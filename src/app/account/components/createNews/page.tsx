'use client'
import React, { useState } from 'react'
import axios from 'axios'
import styles from "./page.module.scss"
import { Field, FieldArray, Formik, Form } from 'formik';
import { ImageFile, FormValues } from '@/types/createNews';
import { categoryOptions, keywordOptions } from './components/presets';
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
    author: '',
    seoTitle: '',
    seoDescription: '',
    seoImage: null,
    seoKeywords: [],
};




const CreateNews = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [seoImage, setSeoImage] = useState<File | null>(null)

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
                            <div className={styles.group}>
                                <CustomField name="title" setFieldValue={setFieldValue} label='title' fieldType="input" />
                                <CustomField name="seoTitle" setFieldValue={setFieldValue} label='SEO Title' fieldType="input" />
                            </div>
                            <div className={styles.group}>
                                <ReactQuillField name="subTitle" label="Subtitle" value={values.subTitle} onChange={setFieldValue} />
                                <ReactQuillField name="seoDescription" label="SEO Description" value={values.seoDescription} onChange={setFieldValue} />
                            </div>
                            <div className={styles.checkboxField}>
                                <ImageUploader mainImg={mainImg} setMainImg={setMainImg} title='News Main' />
                                <ImagesUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                                <ImageUploader mainImg={seoImage} setMainImg={setSeoImage} title='SEO Image' />
                            </div>
                            <div className={styles.checkboxField} style={{ padding: "1rem" }}>
                                <FieldArray name="section">
                                    {({ insert, remove, push }) => (
                                        <div className={styles.groupCheckboxes} >
                                            {values.section.map((section, index) => (
                                                <div key={index} style={{ border: "1px solid var(--border-color)", borderRadius: "1rem", padding: "0.4rem" }}>
                                                    <Field name={`section.${index}.title`} placeholder="Section Title" />
                                                    <Field name={`section.${index}.subTitle`} placeholder="Section Subtitle" />
                                                    <Field as="textarea" name={`section.${index}.description`} placeholder="Description" />

                                                    <div className={styles.spaceBetween}>
                                                        <button type="button" onClick={() => remove(index)}>
                                                            Remove
                                                        </button>
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
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>


                            </div>
                            <div className={styles.formField}>
                                <CheckboxGroupFieldArray name="tags" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.tags} />
                                <CheckboxGroupFieldArray name='seoKeywords' options={keywordOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.seoKeywords} />
                            </div>
                            <div className={styles.checkboxField}>
                                <CustomField name="category" label="Category" fieldType="select" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} />
                                <input type="date" name="date" value={values.date} onChange={(e) => setFieldValue('date', e.target.value)} />
                                <CustomField name="author" setFieldValue={setFieldValue} label='author' fieldType="input" />
                            </div>
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