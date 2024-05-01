import React, { useState } from 'react';
import styles from "../../page.module.scss";
import common from "../../common.module.scss";
import ImageUploader from '../createNews/components/ImageUploader';
import axios from 'axios';
import { Form, Formik, Field, FormikHelpers } from 'formik';
import CustomField from '../createNews/components/CustomField';
import * as Yup from 'yup';

interface FormValues {
    name: string;
    image: File | null;
    position?: string; // Optional for 'team'
}

const CreateCommon: React.FC<{ type: 'partner' | 'workedWith' | 'team' | 'portfolio' }> = ({ type }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const initialValues: FormValues = {
        name: '',
        image: null,
        ...(type === 'team' && { position: '' }) // Add position field only for team
    };

    // Dynamic endpoint based on the type
    const endpoint = {
        'partner': '/partner',
        'workedWith': '/workedWith',
        'team': '/team',
        'portfolio': '/portfolio'
    }[type];

    // Validation Schema including optional position field for team
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        image: Yup.mixed().required("An image is required"),
        ...(type === 'team' && {
            position: Yup.string().required("Position is required")
        })
    });

    const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        if (image) {
            formData.append('image', image);
        }
        if (values.position) {
            formData.append('position', values.position);
        }

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.data.message === "Success") {
                setSuccess(true);
                setError('')
                resetForm();
                setImage(null); // Reset image state as well
                console.log("Success");
            }
            else {
                throw new Error("Failed to create entry");
            }
        } catch (err) {
            const message = axios.isAxiosError(err) && err.response
                ? (err.response.data.message || "An unknown error occurred")
                : "Network error";
            setError(message);
            setSuccess(false)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={common.common}>
            <h1>Create {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue }) => (
                    <Form>
                        <CustomField name="name" label="Name" fieldType="input" />
                        <ImageUploader mainImg={image} setMainImg={(file) => {
                            setImage(file);
                            setFieldValue('image', file);
                        }} title={type} />
                        {type === 'team' && <Field name="position" placeholder="Position" component="input" />}
                        <button className={common.submitButton} type="submit" disabled={loading}>
                            {loading ? `Creating ${type}...` : `Create ${type}`}
                        </button>
                        {error && <p className={common.error}>{error}</p>}
                        {success && <p className={common.success}>{type} created successfully</p>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateCommon;
