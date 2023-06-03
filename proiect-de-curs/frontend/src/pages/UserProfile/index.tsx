import React from 'react';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { FileUploader } from 'react-drag-drop-files';
import { AnimatePresence } from 'framer-motion';

import { Components } from 'components';

import { FormikFields, FormikTextArea } from './FormikFields';
import { UserEditSchema } from './FormikSchemas';

import {
    addUserAvatar,
    deleteUserAvatar,
    updateUser,
} from 'redux/slices/userSlice';

const UserProfile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.user);
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalMessage, setModalMessage] = React.useState<
        'ok' | 'cancel' | ''
    >('');
    const [rsForm, setRsForm] = React.useState<any>(null);

    const [avatar, setAvatar] = React.useState<string>('');
    const fileTypes = ['JPG', 'PNG', 'JPEG'];

    const handleSubmit = (values: any) => {
        const { firstName, lastName, email, description } = values;

        setIsEditMode(false);
        dispatch(
            updateUser({
                firstName,
                lastName,
                email,
                description,
                avatarUrl: avatar,
            })
        );
    };

    const handleCancel = (setErrors: any, resetForm: any) => {
        setIsModalOpen(true);
        setRsForm({ setErrors, resetForm });
    };

    const handleChangeFile = async (e: any) => {
        const formData = new FormData();
        if (avatar && e.name !== avatar.split('uploads/')[1]) {
            dispatch(deleteUserAvatar(avatar));
        }
        formData.append('avatar', e);

        const { payload } = await dispatch(addUserAvatar(formData));
        const { url } = payload as { url: string };
        setAvatar(url);
    };

    React.useEffect(() => {
        if (modalMessage === 'ok') {
            setIsEditMode(false);
            setModalMessage('');
            setAvatar(user.avatarUrl);
            rsForm.resetForm();
        }
    }, [modalMessage, rsForm, user.avatarUrl]);

    React.useEffect(() => {
        setAvatar(user.avatarUrl);
    }, [user.avatarUrl]);

    return (
        <div className="flex justify-center p-3">
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    description: user.description,
                }}
                validationSchema={UserEditSchema}
                initialTouched={{
                    firstName: true,
                    lastName: true,
                    email: true,
                    description: true,
                }}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                    actions.setSubmitting(true);
                }}
            >
                {({ setErrors, resetForm, values }) => (
                    <Form className="flex flex-col gap-3">
                        <div className="flex w-full flex-col flex-wrap content-center items-center gap-3">
                            <div className="relative flex h-32 w-32 rounded-full">
                                {avatar !== '' ? (
                                    <Components.ImageRenderer
                                        imageUrl={avatar}
                                        alt={'No avatar'}
                                        className={
                                            'h-full w-full rounded-full object-cover text-9xl'
                                        }
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center">
                                        <Components.ImageRenderer
                                            imageUrl={user.avatarUrl}
                                            type={'userAvatar'}
                                            alt={'No avatar'}
                                            className={
                                                'h-full w-full rounded-full object-cover text-9xl'
                                            }
                                        />
                                    </div>
                                )}
                                {!isEditMode && (
                                    <div className="absolute -right-5 top-0">
                                        <button
                                            onClick={() => {
                                                setIsEditMode(true);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-blue-700">
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {isEditMode && (
                                <FileUploader
                                    handleChange={handleChangeFile}
                                    name="file"
                                    types={fileTypes}
                                    multiple={false}
                                    label="Drag & Drop your avatar here"
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                            <div>
                                <FormikFields
                                    value={'firstName'}
                                    disabled={!isEditMode}
                                />
                                <FormikFields
                                    value={'lastName'}
                                    disabled={!isEditMode}
                                />
                                <FormikFields
                                    value={'email'}
                                    type={'email'}
                                    disabled={!isEditMode}
                                />
                            </div>
                            <FormikTextArea
                                value={'description'}
                                disabled={!isEditMode}
                                placeholder={values.description}
                            />
                        </div>

                        {isEditMode && (
                            <div className="mt-4 flex justify-center gap-3">
                                <button
                                    className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                                    type="button"
                                    onClick={() =>
                                        handleCancel(setErrors, resetForm)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
            <AnimatePresence>
                {isEditMode && isModalOpen && (
                    <Components.ModalConfirmation
                        header="Confirm"
                        body="You have unsaved changes. Are you sure you want to leave?"
                        confirm="Ok"
                        cancel="Cancel"
                        setIsModalOpen={setIsModalOpen}
                        setIsEditMode={setIsEditMode}
                        setModalMessage={setModalMessage}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserProfile;
