import { FC, memo } from "react";
import Drawer from "../../../../components/Drawer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Edit, Plus } from "lucide-react";
import { PegawaiDrawerViewProps, pegawaiSchema } from "../Pegawai.data";

const PegawaiDrawerView: FC<PegawaiDrawerViewProps> = ({ createPegawaiMutation, action, updatePegawaiMutation, pegawaiById, handleCloseDrawer, visibleButton }) => (
    <Drawer
        id={action === 'add' ? "add-pegawai" : "edit-pegawai"}
        title={action === 'add' ? "Add Pegawai" : "Edit Pegawai"}
        handleCloseDrawer={handleCloseDrawer}
        renderButtonDrawer={() => (
            <label
                htmlFor={action === 'add' ? "add-pegawai" : "edit-pegawai"}
                className={`btn btn-sm px-4 cursor-pointer rounded-full gap-2 w-full ${(!visibleButton || (action === 'edit' && !pegawaiById)) ? 'hidden' : 'bg-slate-900 text-white'}`}
            >
                <div className="flex items-center gap-1">
                    {action === 'add' ? <Plus width={15} /> : <Edit width={15} />}
                    <span>{action === 'add' ? 'Add New Pegawai' : 'Edit Pegawai'}</span>
                </div>
            </label>
        )}
    >
        {action === 'edit' && !pegawaiById ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
        ) : (pegawaiById && Object.keys(pegawaiById).length === 0) ? (
            <div className="text-center text-red-500 py-4">Failed to load data</div>
        ) : (
            <Formik
                initialValues={{
                    nama: pegawaiById?.nama_pegawai || '',
                    nip: pegawaiById?.nip || '',
                    alamat: pegawaiById?.alamat || ''
                }}
                validationSchema={pegawaiSchema}
                onSubmit={(values) => {
                    if (action === 'add') {
                        createPegawaiMutation(values);
                    } else if (action === 'edit' && updatePegawaiMutation) {
                        updatePegawaiMutation(values);
                    }
                }}
                enableReinitialize
            >
                <Form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Pegawai Name</span>
                        </label>
                        <Field
                            id="nama"
                            name="nama"
                            type="text"
                            placeholder="Pegawai Name"
                            className="input input-sm input-bordered w-full rounded-full border-slate-900"
                        />
                        <ErrorMessage name="nama" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">NIP</span>
                        </label>
                        <Field
                            id="nip"
                            name="nip"
                            type="text"
                            placeholder="NIP"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="input input-sm input-bordered w-full rounded-full border-slate-900"
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        <ErrorMessage name="nip" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <Field
                            id="alamat"
                            name="alamat"
                            as="textarea"
                            placeholder="Address"
                            className="textarea textarea-sm textarea-bordered w-full rounded-2xl border-slate-900"
                        />
                        <ErrorMessage name="alamat" component="div" className="text-red-600 text-xs mt-1" />

                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-sm w-full rounded-full bg-slate-900 text-white">
                            {action === 'add' ? 'Create' : 'Update'}
                        </button>
                    </div>
                </Form>
            </Formik>
        )}
    </Drawer>
);

export default memo(PegawaiDrawerView);
