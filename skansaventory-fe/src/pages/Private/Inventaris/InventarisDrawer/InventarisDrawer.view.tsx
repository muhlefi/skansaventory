import { FC, memo } from "react";
import Drawer from "../../../../components/Drawer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Edit, Plus } from "lucide-react";
import { InventarisDrawerViewProps, inventarisSchema } from "../Inventaris.data";

const inventarisDrawerView: FC<InventarisDrawerViewProps> = ({ createInventarisMutation, action, updateInventarisMutation, inventarisById, handleCloseDrawer, visibleButton, comboboxJenis, comboboxRuang, petugasId }) => (
    <Drawer
        id={action === 'add' ? "add-inventaris" : "edit-inventaris"}
        title={action === 'add' ? "Add Inventaris" : "Edit Inventaris"}
        handleCloseDrawer={handleCloseDrawer}
        renderButtonDrawer={() => (
            <label
                htmlFor={action === 'add' ? "add-inventaris" : "edit-inventaris"}
                className={`btn btn-sm px-4 cursor-pointer rounded-full gap-2 w-full ${(!visibleButton || (action === 'edit' && !inventarisById)) ? 'hidden' : 'bg-slate-900 text-white'}`}
            >
                <div className="flex items-center gap-1">
                    {action === 'add' ? <Plus width={15} /> : <Edit width={15} />}
                    <span>{action === 'add' ? 'Add New Inventaris' : 'Edit Inventaris'}</span>
                </div>
            </label>
        )}
    >
        {action === 'edit' && !inventarisById ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
        ) : (inventarisById && Object.keys(inventarisById).length === 0) ? (
            <div className="text-center text-red-500 py-4">Failed to load data</div>
        ) : (
            <Formik
                initialValues={{
                    nama: inventarisById?.nama || '',
                    kode: inventarisById?.kode_inventaris || '',
                    jumlah: inventarisById?.jumlah || 0,
                    kondisi: inventarisById?.kondisi || '',
                    keterangan: inventarisById?.keterangan || '',
                    id_petugas: petugasId || 0,
                    id_jenis: inventarisById?.id_jenis || 0,
                    id_ruang: inventarisById?.id_ruang || 0
                }}
                validationSchema={inventarisSchema}
                onSubmit={(values) => {
                    if (action === 'add') {
                        createInventarisMutation(values);
                    } else if (action === 'edit' && updateInventarisMutation) {
                        updateInventarisMutation(values);
                    }
                }}
                enableReinitialize
            >
                {({ setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Item Type</span>
                            </label>
                            <Field as="select" name="id_jenis" className="select select-sm select-bordered w-full rounded-full border-slate-900" onChange={(e: any) => setFieldValue('id_jenis', Number(e.target.value))}>
                                <option value={0}>Select Item Type</option>
                                {comboboxJenis.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_jenis" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Inventaris Name</span>
                            </label>
                            <Field
                                id="nama"
                                name="nama"
                                type="text"
                                placeholder="Inventaris Name"
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
                                <span className="label-text">Quantity</span>
                            </label>
                            <Field
                                id="jumlah"
                                name="jumlah"
                                type="number"
                                placeholder="Quantity"
                                min={0}
                                className="input input-sm input-bordered w-full rounded-full border-slate-900"
                            />
                            <ErrorMessage name="jumlah" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Condition</span>
                            </label>
                            <Field as="select" name="kondisi" className="select select-sm select-bordered w-full rounded-full border-slate-900">
                                <option value="">Select Condition</option>
                                <option value="1">New</option>
                                <option value="2">Second</option>
                            </Field>
                            <ErrorMessage name="kondisi" component="div" className="text-red-600 text-xs mt-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <Field as="select" name="id_ruang" className="select select-sm select-bordered w-full rounded-full border-slate-900" onChange={(e: any) => setFieldValue('id_ruang', Number(e.target.value))}>
                                <option value={0}>Select Location</option>
                                {comboboxRuang.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_ruang" component="div" className="text-red-600 text-xs mt-1" />
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
                        <div className="pt-4">
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

export default memo(inventarisDrawerView);
