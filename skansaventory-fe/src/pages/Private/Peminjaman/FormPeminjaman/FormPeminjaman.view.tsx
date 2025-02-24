import { FC, memo } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { formPeminjamanSchema, FormPeminjamanViewProps } from "../Peminjaman.data";
import { Package, Plus, X } from "lucide-react";

const FormPeminjamanView: FC<FormPeminjamanViewProps> = ({ pegawaiId, comboboxInventaris, createPeminjamanMutation, openCancelModal }) => {
    return (
        <div className="mr-8 my-8 bg-white rounded-3xl border">
            <div className="border-b p-6">
                <span className="font-semibold mb-6">Add Peminjaman Form</span>
            </div>
            <Formik
                initialValues={{
                    pegawaiId: pegawaiId,
                    pinjam: "",
                    kembali: "",
                    status: "1",
                    detail_pinjam: [{
                        id_inventaris: "",
                        jumlah: 0
                    }]
                }}
                validationSchema={formPeminjamanSchema}
                onSubmit={createPeminjamanMutation}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                            <div className="flex flex-col gap-6 border max-h-[22rem] border-slate-900 rounded-3xl p-6">
                                <span className="font-semibold">Borrow Date</span>
                                <div className="flex flex-col gap-4">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="text-sm">Borrow Date</span>
                                        </label>
                                        <Field
                                            name="pinjam"
                                            type="datetime-local"
                                            className="input input-sm input-bordered rounded-full w-full border-slate-900"
                                        />
                                        <ErrorMessage name="pinjam" component="div" className="text-red-600 text-xs mt-1" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="text-sm">Return Date</span>
                                        </label>
                                        <Field
                                            name="kembali"
                                            type="datetime-local"
                                            min={values.pinjam}
                                            className="input input-sm input-bordered rounded-full w-full border-slate-900"
                                        />
                                        <ErrorMessage name="kembali" component="div" className="text-red-600 text-xs mt-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <FieldArray name="detail_pinjam">
                                    {({ push, remove }) => {
                                        const allItemsSelected = comboboxInventaris?.every(option =>
                                            values.detail_pinjam.some((item: any) => item.id_inventaris === option.id_inventaris)
                                        );

                                        return (
                                            <div className="space-y-4">
                                                {values.detail_pinjam.map((item, index) => {
                                                    const selectedInventaris = comboboxInventaris?.find(
                                                        option => option.id_inventaris === item.id_inventaris
                                                    );

                                                    return (
                                                        <div key={index} className="bg-white rounded-3xl border border-slate-900 p-6">
                                                            <div className="flex justify-between mb-2">
                                                                <span className="font-semibold">Item {index + 1}</span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm w-10 h-10 rounded-2xl bg-red-600 text-white"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <X />
                                                                </button>
                                                            </div>
                                                            <div className="flex flex-col lg:flex-row gap-6">
                                                                <div className="flex flex-col gap-4 w-full lg:w-1/3">
                                                                    <div className="form-control w-full">
                                                                        <label className="label">
                                                                            <span className="label-text">Inventaris</span>
                                                                        </label>
                                                                        <Field
                                                                            as="select"
                                                                            name={`detail_pinjam.${index}.id_inventaris`}
                                                                            className="select select-sm select-bordered w-full rounded-full border-slate-900"
                                                                            onChange={(e: any) => setFieldValue(`detail_pinjam.${index}.id_inventaris`, Number(e.target.value))}
                                                                        >
                                                                            <option value={0}>Select Inventaris</option>
                                                                            {comboboxInventaris?.map(option => (
                                                                                <option
                                                                                    key={option.id_inventaris}
                                                                                    value={option.id_inventaris}
                                                                                    disabled={values.detail_pinjam.some((item: any) => item.id_inventaris === option.id_inventaris)}
                                                                                >
                                                                                    {option.nama}
                                                                                </option>
                                                                            ))}
                                                                        </Field>
                                                                        <ErrorMessage name={`detail_pinjam.${index}.id_inventaris`} component="div" className="text-red-600 text-xs mt-1" />
                                                                    </div>

                                                                    <div className="form-control w-full">
                                                                        <label className="label">
                                                                            <span className="label-text">Quantity</span>
                                                                        </label>
                                                                        <Field
                                                                            id="jumlah"
                                                                            name={`detail_pinjam.${index}.jumlah`}
                                                                            type="number"
                                                                            placeholder="Quantity"
                                                                            min={0}
                                                                            max={selectedInventaris?.jumlah_tersedia || 0}
                                                                            className="input input-sm input-bordered w-full rounded-full border-slate-900"
                                                                        />
                                                                        <ErrorMessage name={`detail_pinjam.${index}.jumlah`} component="div" className="text-red-600 text-xs mt-1" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col border border-slate-900 rounded-2xl p-6 gap-6 w-full lg:w-2/3 h-auto lg:h-52">
                                                                    {selectedInventaris ? (
                                                                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 h-full">
                                                                            <div className="bg-slate-200 w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                                                <div className="text-3xl font-bold text-slate-700">
                                                                                    {selectedInventaris.nama.charAt(0).toUpperCase()}
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-col gap-4 flex-1 text-center lg:text-left">
                                                                                <div>
                                                                                    <h3 className="font-semibold text-lg text-slate-900 mb-1">
                                                                                        {selectedInventaris.nama}
                                                                                    </h3>
                                                                                    <span className="badge badge-sm bg-slate-100 text-slate-700 border-slate-300">
                                                                                        {selectedInventaris.kode_inventaris}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                                                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                                                        <span className="text-sm text-slate-600">
                                                                                            Available: <span className="font-medium text-slate-700">{selectedInventaris.jumlah_tersedia} unit</span>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                                                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                                                        <span className="text-sm text-slate-600">
                                                                                            Location: <span className="font-medium text-slate-700">{selectedInventaris.nama_ruang}</span>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                                                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                                                        <span className="text-sm text-slate-600">
                                                                                            Condition: <span className="badge badge-sm badge-success text-white">Good</span>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                                                                            <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                                                                                <Package size={24} className="text-slate-400" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-slate-900 text-sm">Select an item to see its details</p>
                                                                                <p className="text-slate-400 text-xs">Item information will appear here</p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    );
                                                })}
                                                {values.detail_pinjam.length === 0 && (
                                                    <p className="text-red-600 text-xs mt-1 text-center">
                                                        At least one item is required
                                                    </p>
                                                )}
                                                {!allItemsSelected && (
                                                    <button
                                                        type="button"
                                                        onClick={() => push({ id_inventaris: 0, jumlah: 0 })}
                                                        className="btn btn-sm rounded-full bg-slate-900 text-white btn-slate-900 flex items-center w-full"
                                                    >
                                                        <Plus size={17} />
                                                        Add New Item
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    }}
                                </FieldArray>
                            </div>
                        </div>
                        <div className="flex border-t p-6 justify-between">
                        <button type="button" className="btn btn-sm btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:border-red-600 rounded-full w-full md:w-fit px-6" onClick={openCancelModal}>
                                Cancel Peminjaman
                            </button>
                            <button type="submit" className="btn btn-sm bg-slate-900 text-white rounded-full w-full md:w-fit px-6">
                                Submit Peminjaman
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default memo(FormPeminjamanView);