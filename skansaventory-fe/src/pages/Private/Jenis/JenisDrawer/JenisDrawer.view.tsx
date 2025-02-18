import { FC, memo } from "react";
import Drawer from "../../../../components/Drawer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Edit, Plus } from "lucide-react";
import { JenisDrawerViewProps, jenisSchema } from "../Jenis.data";

const JenisDrawerView: FC<JenisDrawerViewProps> = ({ createJenisMutation, action, updateJenisMutation, jenisById, handleCloseDrawer, visibleButton }) => (
    <Drawer
        id={action === 'add' ? "add-jenis" : "edit-jenis"}
        title={action === 'add' ? "Add Jenis" : "Edit Jenis"}
        handleCloseDrawer={handleCloseDrawer}
        renderButtonDrawer={() => (
            <label
                htmlFor={action === 'add' ? "add-jenis" : "edit-jenis"}
                className={`btn btn-sm px-4 cursor-pointer rounded-full gap-2 w-full ${(!visibleButton || (action === 'edit' && !jenisById)) ? 'hidden' : 'bg-slate-900 text-white'}`}
            >
                <div className="flex items-center gap-1">
                    {action === 'add' ? <Plus width={15} /> : <Edit width={15} />}
                    <span>{action === 'add' ? 'Add New Jenis' : 'Edit Jenis'}</span>
                </div>
            </label>
        )}
    >
        {/* Loading atau Error Handler */}
        {action === 'edit' && !jenisById ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
        ) : (jenisById && Object.keys(jenisById).length === 0) ? (
            <div className="text-center text-red-500 py-4">Failed to load data</div>
        ) : (
            <Formik
                initialValues={{
                    nama: jenisById?.nama_jenis || '',
                    kode: jenisById?.kode_jenis || '',
                    keterangan: jenisById?.keterangan || ''
                }}
                validationSchema={jenisSchema}
                onSubmit={(values) => {
                    if (action === 'add') {
                        createJenisMutation(values);
                    } else if (action === 'edit' && updateJenisMutation) {
                        updateJenisMutation(values);
                    }
                }}
                enableReinitialize
            >
                <Form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Jenis Name</span>
                        </label>
                        <Field
                            id="nama"
                            name="nama"
                            type="text"
                            placeholder="Jenis Name"
                            className="input input-sm input-bordered w-full rounded-full border-slate-900"
                        />
                        <ErrorMessage name="nama" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Code</span>
                        </label>
                        <Field
                            id="kode"
                            name="kode"
                            type="text"
                            placeholder="Code"
                            className="input input-sm input-bordered w-full rounded-full border-slate-900"
                        />
                        <ErrorMessage name="kode" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <Field
                            id="keterangan"
                            name="keterangan"
                            as="textarea"
                            placeholder="Description"
                            className="textarea textarea-sm textarea-bordered w-full rounded-2xl border-slate-900"
                        />
                        <ErrorMessage name="keterangan" component="div" className="text-red-600 text-xs mt-1" />

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

export default memo(JenisDrawerView);
