import React from 'react';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from 'redux/store';

import { FormikFields, FormikTextArea } from './FormikFields';
import { UserEditSchema } from './FormikSchemas';
import {
    addUserAvatar,
    deleteUserAvatar,
    updateUser,
} from 'redux/slices/userSlice';

import ModalConfirmation from 'components/ModalConfirmation';
import { IUserEdit } from 'shared/interfaces/IUser';
import { FileUploader } from 'react-drag-drop-files';

const UserSettings = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalMessage, setModalMessage] = React.useState<
        'ok' | 'cancel' | ''
    >('');
    const [rsForm, setRsForm] = React.useState<any>(null);

    const [avatar, setAvatar] = React.useState<string>('');
    const [temp, setTemp] = React.useState(null);
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
            rsForm.resetForm();
        }
    }, [modalMessage, rsForm]);

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
                {({ setErrors, resetForm }) => (
                    <Form className="flex flex-col gap-3">
                        <div className="flex w-full flex-col flex-wrap content-center items-center gap-3">
                            <div className="relative flex h-32 w-32 rounded-full">
                                {avatar !== '' ? (
                                    <img
                                        src={`http://localhost:5000/${avatar}`}
                                        alt="No avatar"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full flex-col items-center">
                                        {user.avatarUrl !== '' ? (
                                            <img
                                                src={`http://localhost:5000/${user.avatarUrl}`}
                                                alt="No avatar"
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined text-9xl text-gray-500">
                                                account_circle
                                            </span>
                                        )}
                                    </div>
                                )}
                                {/*{user.avatarUrl !== '' ? (*/}
                                {/*    <img*/}
                                {/*        src={`http://localhost:5000/${user.avatarUrl}`}*/}
                                {/*        alt="No avatar"*/}
                                {/*        className="h-full w-full rounded-full object-cover"*/}
                                {/*    />*/}
                                {/*) : (*/}
                                {/*    <div className="flex h-full w-full flex-col items-center">*/}
                                {/*        {avatar === '' ? (*/}
                                {/*            <span className="material-symbols-outlined text-9xl text-gray-500">*/}
                                {/*                account_circle*/}
                                {/*            </span>*/}
                                {/*        ) : (*/}
                                {/*            <img*/}
                                {/*                src={`http://localhost:5000/${avatar}`}*/}
                                {/*                alt="No avatar"*/}
                                {/*                className="h-full w-full rounded-full object-cover"*/}
                                {/*            />*/}
                                {/*        )}*/}
                                {/*    </div>*/}
                                {/*)}*/}
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
                                // <input
                                //     id="avatar"
                                //     name="avatar"
                                //     type="file"
                                //     onChange={handleChangeFile}
                                // />

                                <FileUploader
                                    handleChange={handleChangeFile}
                                    name="file"
                                    types={fileTypes}
                                    multiple={false}
                                    label="Drag & Drop your avatar here"
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
                            <div className="flex flex-col">
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
                            <div className="flex flex-col">
                                <FormikTextArea
                                    value={'description'}
                                    disabled={!isEditMode}
                                />
                            </div>
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
            {isEditMode && isModalOpen && (
                <ModalConfirmation
                    header="Confirm"
                    body="You have unsaved changes. Are you sure you want to leave?"
                    confirm="Ok"
                    cancel="Cancel"
                    setIsModalOpen={setIsModalOpen}
                    setIsEditMode={setIsEditMode}
                    setModalMessage={setModalMessage}
                />
            )}
        </div>
    );
};

export default UserSettings;
