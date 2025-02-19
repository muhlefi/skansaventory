import { FC, memo } from "react";
import Drawer from "../../../../components/Drawer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Edit, Plus } from "lucide-react";
import { PetugasDrawerViewProps, petugasSchema } from "../Users.data";

const PetugasDrawerView: FC<PetugasDrawerViewProps> = ({ createPetugasMutation, action, updatePetugasMutation, petugasById, handleCloseDrawer, visibleButton, comboboxLevel, comboboxPegawai }) => (
    <Drawer
        id={action === 'add' ? "add-petugas" : "edit-petugas"}
        title={action === 'add' ? "Add User" : "Edit User"}
        handleCloseDrawer={handleCloseDrawer}
        renderButtonDrawer={() => (
            <label
                htmlFor={action === 'add' ? "add-petugas" : "edit-petugas"}
                className={`btn btn-sm px-4 cursor-pointer rounded-full gap-2 w-full ${(!visibleButton || (action === 'edit' && !petugasById)) ? 'hidden' : 'bg-slate-900 text-white'}`}
            >
                <div className="flex items-center gap-1">
                    {action === 'add' ? <Plus width={15} /> : <Edit width={15} />}
                    <span>{action === 'add' ? 'Add New User' : 'Edit User'}</span>
                </div>
            </label>
        )}
    >
        {action === 'edit' && !petugasById ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
        ) : (petugasById && Object.keys(petugasById).length === 0) ? (
            <div className="text-center text-red-500 py-4">Failed to load data</div>
        ) : (
            <Formik
                initialValues={{
                    nama: petugasById?.nama_petugas || '',
                    username: petugasById?.username || '',
                    password: '',
                    id_level: petugasById?.id_level || 0,
                    id_pegawai: petugasById?.id_pegawai || 0
                }}
                validationSchema={petugasSchema}
                onSubmit={(values) => {
                    if (action === 'add') {
                        createPetugasMutation(values);
                    } else if (action === 'edit' && updatePetugasMutation) {
                        updatePetugasMutation(values);
                    }
                }}
                enableReinitialize
            >
                {({ setFieldValue }) => (
                    <Form className="space-y-3">
                        <div>
                            <label className="label">
                                <span className="label-text">Petugas Name</span>
                            </label>
                            <Field
                                name="nama"
                                type="text"
                                placeholder="Petugas Name"
                                className="input input-sm input-bordered w-full rounded-full border-slate-900"
                            />
                            <ErrorMessage name="nama" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <Field
                                name="username"
                                type="text"
                                placeholder="Username"
                                className="input input-sm input-bordered w-full rounded-full border-slate-900"
                            />
                            <ErrorMessage name="username" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="input input-sm input-bordered w-full rounded-full border-slate-900"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">User Role</span>
                            </label>
                            <Field
                                name="id_level"
                                as="select"
                                className="select select-sm select-bordered w-full rounded-full border-slate-900"
                                onChange={(e: any) => {
                                    setFieldValue("id_level", Number(e.target.value));
                                }}
                            >
                                <option value={0}>Select Level</option>
                                {comboboxLevel.map(role => (
                                    <option key={role.value} value={role.value}>{role.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_level" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Pegawai</span>
                            </label>
                            <Field
                                name="id_pegawai"
                                as="select"
                                className="select select-sm select-bordered w-full rounded-full border-slate-900"
                                onChange={(e: any) => {
                                    setFieldValue("id_pegawai", Number(e.target.value));
                                }}
                            >
                                <option value="">Select Pegawai</option>
                                {comboboxPegawai.map(pegawai => (
                                    <option key={pegawai.value} value={pegawai.value}>{pegawai.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_pegawai" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="btn btn-sm w-full rounded-full bg-slate-900 text-white">
                                {action === 'add' ? 'Create' : 'Update'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        )}
    </Drawer>
);

export default memo(PetugasDrawerView);
