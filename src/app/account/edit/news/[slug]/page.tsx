'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Field, FieldArray, Formik, Form } from 'formik';
import { FormValues } from '@/types/createNews';
import styles from "./page.module.scss";
import checkboxStyles from "../../../components/createNews/page.module.scss"
import common from "../../../common.module.scss";
import Image from 'next/image';
import { useNewsBySlug } from '@/lib/news/useNewsById';
import CheckboxGroupFieldArray from '@/app/account/components/createNews/components/ChecboxGroupFieldArray';
import { categoryOptions } from '@/app/account/components/createNews/components/presets';
import CustomField from '@/app/account/components/createNews/components/CustomField';
import ReactQuillField from '@/app/account/components/createNews/components/ReactQuillField';
import * as Yup from 'yup';
import Link from 'next/link';

const EditNews = () => {
    const { slug } = useParams();
    const { news } = useNewsBySlug(slug as string);
    console.log(slug, "slug", news, "news")

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').max(24, 'Title cannot exceed 24 characters'),
        subTitle: Yup.string().required('Subtitle is required').max(5000, 'Subtitle cannot exceed 5000 characters'),
        category: Yup.string().required('Category is required'),
        date: Yup.string().required('Date is required'),
    });



    const [initialValues, setInitialValues] = useState<FormValues>({
        title: '',
        subTitle: '',
        mainImg: null,
        images: [],
        section: [{ title: '', subTitle: '', description: '' }],
        category: '',
        tags: [],
        date: '',
        author: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [mainImg, setMainImg] = useState<File | null>(null);
    const [mainImgPreview, setMainImgPreview] = useState<string | null>(null);
    const [images, setImages] = useState<File[] | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);


    const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setMainImg(event.target.files[0]);
            setMainImgPreview(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setImages(filesArray);
            setImagePreviews(filesArray.map(file => URL.createObjectURL(file)));
        }
    };


    useEffect(() => {
        if (news) {
            setInitialValues({
                title: news.title,
                subTitle: news.subTitle,
                mainImg: null,
                images: [],
                section: news.section || [{ title: '', subTitle: '', description: '' }],
                category: news.category,
                tags: news.tags,
                date: news.date,
                author: news.author
            });
            setMainImgPreview(news.mainImg.url);
            setImagePreviews(news.images.map(img => img.url));
        }
    }, [news]);

    const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const formData = new FormData();
        // Append only if the value changed or is new

        Object.keys(values).forEach(key => {
            if (key !== "mainImg" && key !== "images") {
                const value = values[key];
                if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                    // Handle nested objects like location
                    Object.keys(value).forEach(subKey => {
                        formData.append(`${key}[${subKey}]`, value[subKey]);
                    });
                } else if (Array.isArray(value)) {
                    if (key === 'tags') {
                        // Only append tags if they have changed
                        if (JSON.stringify(value) !== JSON.stringify(initialValues.tags)) {
                            value.forEach((item, index) => {
                                formData.append(`${key}[${index}]`, item);
                            });
                        }
                    } else {
                        value.forEach((item, index) => {
                            if (typeof item === 'object') {
                                // Skip appending 'id' for section array items
                                if (key === 'section') {
                                    const allowedFields = ['title', 'subTitle', 'description'];
                                    Object.keys(item).forEach(subKey => {
                                        if (allowedFields.includes(subKey)) {
                                            formData.append(`${key}[${index}][${subKey}]`, item[subKey].toString());
                                        }
                                    });
                                } else {
                                    // For other object items within arrays
                                    Object.keys(item).forEach(subKey => {
                                        formData.append(`${key}[${index}][${subKey}]`, item[subKey].toString());
                                    });
                                }
                            } else {
                                // For simple arrays that aren't 'tags'
                                formData.append(`${key}[${index}]`, item.toString());
                            }
                        });
                    }
                } else {
                    // Append simple string or number values directly
                    formData.append(key, value.toString());
                }
            }
        });

        if (mainImg) {
            formData.append('mainImg', mainImg);
        }
        if (images) {
            images.forEach(img => {
                formData.append('images', img);
            });
        }


        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${news?._id}`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setError(response.data.err || 'Failed to update news')
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.err) {
                setError(err.response.data.err);
            } else {
                setError('Failed to update news');
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <main className={styles.editNews}>
            <Link href="/account">
                Back to Account
            </Link>
            <h1>Edit News</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize>
                {({ values, setFieldValue }) => (
                    <section className={checkboxStyles.createTour__container}>
                        <Form className={checkboxStyles.createTour__container_content}>
                            <CustomField name="title" label="Title" fieldType="input" />
                            <ReactQuillField name="subTitle" label="Subtitle" value={values.subTitle} onChange={setFieldValue} />
                            <div className={common.group}>
                                <CustomField name="category" label="Category" fieldType='select' options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} />
                                <CustomField name="date" label="Date" fieldType="input" />
                                <CustomField name="author" label="Author" fieldType="input" />
                            </div>

                            <FieldArray name="section">
                                {({ insert, remove, push }) => (
                                    <div className={common.formField}>
                                        {values.section.length > 0 &&
                                            values.section.map((section, index) => (
                                                <div key={index} className={styles.formField}>
                                                    <Field name={`section.${index}.title`} placeholder="Section Title" />
                                                    <Field name={`section.${index}.subTitle`} placeholder="Section Subtitle" />
                                                    <Field name={`section.${index}.description`} placeholder="Section Description" />
                                                    <button type="button" onClick={() => remove(index)}>Remove</button>
                                                </div>
                                            ))}
                                        <button type="button" onClick={() => push({ title: '', subTitle: '', description: '' })}>
                                            Add Section
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

                            <CheckboxGroupFieldArray name="tags" options={categoryOptions.map((cat) => ({ value: cat.value, label: cat.label }))} setFieldValue={setFieldValue} values={values.tags} />
                            <input type="file" onChange={handleMainImageChange} accept="image/*" />
                            {mainImgPreview && (
                                <Image src={mainImgPreview} alt="Main Image" width={250} height={220} />
                            )}
                            <input type="file" multiple onChange={handleImagesChange} accept="image/*" />
                            {imagePreviews && <div className={common.group}>
                                {imagePreviews.map((preview, index) => (
                                    <Image key={index} src={preview} alt={`Image ${index}`} width={250} height={220} />
                                ))}
                            </div>}

                            {loading && <p>Loading...</p>}
                            {error && error.split(',').map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                            <button type="submit"

                                className={common.submitButton}
                                disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </Form>
                    </section>
                )}
            </Formik>
        </main>
    );
};

export default EditNews;
