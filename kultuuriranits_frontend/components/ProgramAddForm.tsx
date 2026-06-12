"use client";

import { useState } from "react";
import { Category } from "../models/Category";
import { Organization } from "../models/Organization";
import { Program } from "@/models/Program";
import { FileText, ImageIcon, PlusCircle, Trash } from "lucide-react";

interface ProgramAddFormProps {
    categories: Category[];
    organizations?: Organization[];
    programs: Program[];
}

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export function ProgramAddForm({
    categories,
    organizations,
    programs,
}: ProgramAddFormProps) {



    // const [formData, setFormData] = useState({
    //     title: "",
    //     description: "",
    //     shortDesc: "",
    //     pricePerStudent: "",
    //     durationMinutes: "",
    //     targetGroup: "",
    //     minGroupSize: "",
    //     maxGroupSize: "",
    //     location: "",
    //     address: "",
    //     county: "",
    //     curriculum: "",
    //     language: "Eesti",
    //     status: "Active",
    //     categoryId: ""
    // });
    const [formimageFile, setFormImageFile] = useState<File | null>(null);
    const [formTitle, setFormTitle] = useState('');
    const [formShortDesc, setFormShortDesc] = useState('');
    const [formFullDesc, setFormFullDesc] = useState('');
    const [formLocation, setFormLocation] = useState('Eesti Rahva Muuseum');
    const [formDuration, setFormDuration] = useState(0);
    const [formPrice, setFormPrice] = useState(0);
    const [formMinGroupSize, setFormMinGroupSize] = useState(0);
    const [formMaxGroupSize, setFormMaxGroupSize] = useState(0);
    const [formCounty, setFormCounty] = useState('Tartumaa');
    const [formAddress, setFormAddress] = useState("");
    const [formOutdoor, setFormOutdoor] = useState(false);
    const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop');
    const [formEmail, setFormEmail] = useState("");
    const [formPhone, setFormPhone] = useState('');
    const [formTargetGroups, setFormTargetGroups] = useState("");
    const [formCategories, setFormCategories] = useState("");
    const [formConnections, setFormConnections] = useState<string[]>(['Ajalugu', 'Kultuuriteadlikkus']);
    const [formLanguages, setFormLanguages] = useState("");
    // const [formAccessibility, setFormAccessibility] = useState<Accessibility>({
    //     wheelchair: true,
    //     hev: true,
    //     signLanguage: false,
    //     audioDescription: false
    // });
    const [formAdditionalInfo, setFormAdditionalInfo] = useState('Soovitame kaasa võtta mugavad riided ja kirjutusvahend.');
    // const [formBookingMethod, setFormBookingMethod] = useState<'platform' | 'contact'>('platform');
    // const [formAvailableTimes, setFormAvailableTimes] = useState<string[]>(['2026-05-25 10:00', '2026-05-25 12:00', '2026-05-25 14:00']);
    const [formMaterials, setFormMaterials] = useState<{ name: string; url: string }[]>([
        { name: 'Tööleht_muuseum.pdf', url: '#' },
        { name: 'Õpetaja_juhend.docx', url: '#' }
    ]);
    const [formPublished, setFormPublished] = useState("");

    // function handleChange(
    //     e: React.ChangeEvent<
    //         HTMLInputElement |
    //         HTMLTextAreaElement |
    //         HTMLSelectElement
    //     >
    // ) {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // }

    const handleCreateNewClick = () => {
        // setEditingProgramId(null);
        setFormTitle(formTitle);
        setFormShortDesc(formShortDesc);
        setFormFullDesc(formFullDesc);
        setFormLocation(formLocation);
        setFormDuration(formDuration);
        setFormPrice(formPrice);
        setFormMinGroupSize(formMinGroupSize);
        setFormMaxGroupSize(formMaxGroupSize);
        setFormCounty(formCounty);
        setFormAddress(formAddress);
        setFormOutdoor(formOutdoor);
        setFormImage('https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop');
        setFormEmail(formEmail);
        setFormPhone(formPhone);
        setFormTargetGroups(formTargetGroups);
        setFormCategories(formCategories);
        setFormConnections(formConnections);
        setFormLanguages(formLanguages);
        // setFormAccessibility({
        //   wheelchair: true,
        //   hev: true,
        //   signLanguage: false,
        //   audioDescription: false
        // });
        setFormAdditionalInfo('Soovitame kaasa võtta mugavad riided ja kirjutusvahend.');
        // setFormBookingMethod('platform');
        // setFormAvailableTimes(['2026-05-25 10:00', '2026-05-25 12:00', '2026-05-25 14:00']);
        // setFormMaterials([
        //   { name: 'Tööleht_muuseum.pdf', url: '#' },
        //   { name: 'Õpetaja_juhend.docx', url: '#' }
        // ]);
        setFormPublished(formPublished);

        // setFormStep('form');
        // setActiveTab('lisa');
    };

    const handleSaveProgramFinal = () => {
        const participantStr = `${formMinGroupSize} - ${formMaxGroupSize} õpilast`;

        // Creating new
        const newProg = {
            title: formTitle,
            location: formLocation,
            // image: formImage || 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop',
            shortDescription: formShortDesc,
            description: formFullDesc,
            pricePerStudent: formPrice,
            targetGroup: formTargetGroups,
            durationMinutes: formDuration,
            categoryId: formCategories,
            language: formLanguages,
            curriculumConnections: formConnections,
            //   accessibility: formAccessibility,
            //materials: formMaterials,
            // contactEmail: formEmail,
            // contactPhone: formPhone,
            status: formPublished,
            minGroupSize: formMinGroupSize,
            maxGroupSize: formMaxGroupSize,
            // county: formCounty,
            // address: formAddress,
            // outdoor: formOutdoor,
            // additionalInfo: formAdditionalInfo,
            // bookingMethod: formBookingMethod,
            // availableTimes: formAvailableTimes
        };
        //   updateLocalPrograms([newProg, ...programsList]);
        //   showToast(`Uus haridusprogramm "${formTitle}" on avaldatud!`, 'success');
        // }

        // setEditingProgramId(null);
        // setActiveTab('programmid');
        // setFormStep('form');
    };


    // async function handleSubmit(
    //     e: React.FormEvent<HTMLFormElement>
    // ) {
    //     e.preventDefault();

    //     if (!imageFile) {
    //         alert("Palun vali pilt");
    //         return;
    //     }

    //     const program = {
    //         title: formData.title,
    //         description: formData.description,
    //         pricePerStudent: Number(formData.pricePerStudent),
    //         durationMinutes: Number(formData.durationMinutes),
    //         targetGroup: formData.targetGroup,
    //         minGroupSize: Number(formData.minGroupSize),
    //         maxGroupSize: Number(formData.maxGroupSize),
    //         location: formData.location,
    //         language: formData.language,
    //         status: formData.status,
    //         category: {
    //             id: Number(formData.categoryId)
    //         }
    //     };

    //     const multipartData = new FormData();
    //     multipartData.append(
    //         "program",
    //         new Blob(
    //             [JSON.stringify(program)],
    //             {
    //                 type: "application/json"
    //             }
    //         )
    //     );

    //     multipartData.append(
    //         "imageFile",
    //         imageFile
    //     );

    //     const response = await fetch(
    //         `${API_URL}/program`,
    //         {
    //             method: "POST",
    //             body: multipartData,
    //             credentials: "include"
    //         }
    //     );

    //     if (!response.ok) {
    //         const errorText = await response.text();
    //         console.error(errorText);

    //         alert("Programmi lisamine ebaõnnestus");
    //         return;
    //     }

    //     alert("Programm lisatud");

    //     setFormData({
    //         title: "",
    //         description: "",
    //         pricePerStudent: "",
    //         durationMinutes: "",
    //         targetGroup: "",
    //         minGroupSize: "",
    //         maxGroupSize: "",
    //         location: "",
    //         language: "Eesti",
    //         status: "Active",
    //         categoryId: ""
    //     });

    //     setImageFile(null);
    // }

    return (
        <div>
            <div className="space-y-6">
                <h3 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Programmi põhiinfo
                </h3>

                {/* Program Title */}
                <div className="space-y-2">
                    <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Kultuuriprogrammi nimetus *</label>
                    <input
                        type="text"
                        required
                        placeholder="nt. Ajarännak minevikku"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="block w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold text-gray-850 shadow-xs"
                    />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                    <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Kultuuriprogrammi lühikirjeldus (1-2 lauset) *</label>
                    <input
                        type="text"
                        required
                        placeholder="Maksimaalselt 150 tähemärki"
                        value={formShortDesc}
                        onChange={(e) => setFormShortDesc(e.target.value)}
                        className="block w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold text-gray-855 shadow-xs"
                    />
                </div>

                {/* Full Description */}
                <div className="space-y-2">
                    <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Kultuuriprogrammi kirjeldus *</label>
                    <textarea
                        required
                        rows={6}
                        placeholder="Kirjelda siin programmi sisu, tegevusi, tulemusi jne..."
                        value={formFullDesc}
                        onChange={(e) => setFormFullDesc(e.target.value)}
                        className="block w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold text-gray-855 shadow-xs"
                    ></textarea>
                </div>

                {/* Keeled (Language checkboxes) */}
                <div className="space-y-2.5">
                    <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Keeled *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-150">
                        {['Eesti', 'Inglise', 'Vene', 'Muu'].map((lang) => (
                            <label key={lang} className="flex items-center gap-3 cursor-pointer text-base font-bold text-gray-700 select-none">
                                <input
                                    type="checkbox"
                                    checked={formLanguages.includes(lang)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFormLanguages(lang);

                                        }
                                    }}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                                {lang}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 my-8 pt-8"></div>

            {/* Section 2: Teemad ja sihtgrupp */}
            <div className="space-y-6">
                <h3 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Teemad ja sihtgrupp
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Categories (Kategooriad) Dropdown Select with tag pills */}
                    <div className="space-y-2">
                        <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Kategooriad *</label>
                        <select
                            value=""
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val && !formCategories.includes(val)) {
                                    setFormCategories(formCategories);
                                }
                                e.target.value = "";
                            }}
                            className="block w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-base font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer h-[54px] appearance-none"
                        >
                            <option value="">Lisa teema / kategooria...</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id} disabled={formCategories.includes(cat.name)}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-wrap gap-2 mt-3 bg-gray-50 p-3 rounded-xl border border-gray-150 min-h-[52px] items-center">
                            {categories?.map(cat => (
                                <span key={cat.id} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-blue-700 text-sm font-bold px-3 py-1 rounded-lg shadow-xs">
                                    {cat.name}
                                    <button
                                        type="button"
                                        //   onClick={() => setFormCategories(}
                                        className="text-blue-500 hover:text-blue-700 font-extrabold cursor-pointer text-sm ml-1"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                            {formCategories.length === 0 && (
                                <span className="text-sm text-gray-455 italic">Ühtegi kategooriat pole valitud</span>
                            )}
                        </div>
                    </div>

                    {/* Target Groups Dropdown Select with tag pills */}
                    <div className="space-y-2">
                        <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Sihtgrupp *</label>
                        <select
                            value=""
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val && !formTargetGroups.includes(val)) {
                                    setFormTargetGroups(val);
                                }
                                e.target.value = "";
                            }}
                            className="block w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-base font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer h-[54px] appearance-none"
                        >
                            <option value="">Lisa sihtgrupp...</option>
                            {['Lasteaed', '1. - 3. klass', '4. - 6. klass', '7. - 9. klass', 'Gümnaasium'].map(grp => (
                                <option key={grp} value={grp} disabled={formTargetGroups.includes(grp)}>
                                    {grp}
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-wrap gap-2 mt-3 bg-gray-50 p-3 rounded-xl border border-gray-150 min-h-[52px] items-center">
                            {/* {formTargetGroups.map(grp => (
                          <span key={grp} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-blue-700 text-sm font-bold px-3 py-1 rounded-lg shadow-xs">
                            {grp}
                            <button 
                              type="button" 
                              onClick={() => setFormTargetGroups(formTargetGroups.filter(g => g !== grp))}
                              className="text-blue-500 hover:text-blue-700 font-extrabold cursor-pointer text-sm ml-1"
                            >
                              &times;
                            </button>
                          </span>
                        ))} */}
                            {formTargetGroups.length === 0 && (
                                <span className="text-sm text-gray-455 italic">Ühtegi sihtgruppi pole valitud</span>
                            )}
                        </div>
                    </div>

                    {/* Õppekavaseosed Dropdown Select with tag pills */}
                    <div className="space-y-2">
                        <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Õppekavaseosed</label>
                        <select
                            value=""
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val && !formConnections.includes(val)) {
                                    setFormConnections([...formConnections, val]);
                                }
                                e.target.value = "";
                            }}
                            className="block w-full px-4 py-3.5 bg-white border border-gray-300 rounded-xl text-base font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer h-[54px] appearance-none"
                        >
                            <option value="">Lisa õppekavaseos...</option>
                            {/* {.map(conn => (
                          <option key={conn} value={conn} disabled={formConnections.includes(conn)}>
                            {conn}
                          </option>
                        ))} */}
                        </select>

                        <div className="flex flex-wrap gap-2 mt-3 bg-gray-50 p-3 rounded-xl border border-gray-150 min-h-[52px] items-center">
                            {formConnections.map(conn => (
                                <span key={conn} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold px-3 py-1 rounded-lg shadow-xs">
                                    {conn}
                                    <button
                                        type="button"
                                        onClick={() => setFormConnections(formConnections.filter(c => c !== conn))}
                                        className="text-gray-400 hover:text-gray-700 font-extrabold cursor-pointer text-sm ml-1"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                            {formConnections.length === 0 && (
                                <span className="text-sm text-gray-455 italic">Õppekavaseoseid pole lisatud</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className="space-y-6">
                <h3 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    Meedia ja õppematerjalid
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Kaanefoto (Image Box Preview) */}
                    <div className="space-y-3">
                        <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Programmi kaanefoto *</label>
                        <div className="border border-gray-200 bg-gray-50 rounded-2xl overflow-hidden h-48 flex flex-col items-center justify-center relative group shadow-xs">
                            {formImage ? (
                                <>
                                    <img
                                        src={formImage}
                                        alt="Programmi kaanefoto eelvaade"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                                            Kaanefoto valitud
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                    <span className="text-base text-gray-450 font-semibold">Pilti pole veel valitud</span>
                                </div>
                            )}
                        </div>

                        {/* Image upload zone or URL */}
                        <div className="space-y-3 pt-2">
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* File input (custom styled) */}
                                <label className="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-3.5 text-base font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all cursor-pointer shadow-xs active:scale-98 border-dashed border-2 hover:border-blue-400">
                                    <PlusCircle className="w-5 h-5 text-gray-400" />
                                    Vali fail arvutist
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > 2 * 1024 * 1024) {
                                                    // showToast('Fail on liiga suur (maksimaalselt 2MB)!', 'error');
                                                    return;
                                                }
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    if (typeof reader.result === 'string') {
                                                        setFormImage(reader.result);
                                                        // showToast('Kaanefoto edukalt laetud!', 'success');
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>

                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="või sisesta pildi URL..."
                                        value={formImage.startsWith('data:image') ? '' : formImage}
                                        onChange={(e) => setFormImage(e.target.value)}
                                        className="block w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-base font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs h-[54px]"
                                    />
                                </div>
                            </div>

                            {/* Presets Row */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFormImage('https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop')}
                                    className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-3 rounded-xl text-sm font-extrabold text-gray-650 transition-all cursor-pointer shadow-xs active:scale-95"
                                >
                                    Ajalugu (ERM)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormImage('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop')}
                                    className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-3 rounded-xl text-sm font-extrabold text-gray-650 transition-all cursor-pointer shadow-xs active:scale-95"
                                >
                                    Kunst ja disain
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Õppematerjalid (Dynamic documents list) */}
                    <div className="space-y-3">
                        <label className="text-base font-extrabold text-gray-800 uppercase tracking-wider block">Õppematerjalid</label>
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-4 rounded-xl border border-gray-150">
                                <input
                                    type="text"
                                    placeholder="Materjali nimetus (nt. Tööleht)"
                                    // value={newMaterialName}
                                    // onChange={(e) => setNewMaterialName(e.target.value)}
                                    className="block flex-1 px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-base font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                                <button
                                    type="button"
                                    // onClick={handleAddMaterial}
                                    className="bg-white hover:bg-gray-100 border border-gray-200 text-gray-750 py-3.5 px-6 rounded-xl text-sm font-bold cursor-pointer transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2 sm:w-auto w-full shrink-0"
                                >
                                    <PlusCircle className="w-5 h-5 text-gray-400" />
                                    Lisa õppematerjal
                                </button>
                            </div>

                            {/* Display added materials list */}
                            <div className="space-y-2 max-h-48 overflow-y-auto pt-1">
                                {formMaterials.map((mat, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-xl text-base font-bold text-gray-700 shadow-xs">
                                        <span className="flex items-center gap-2 truncate"><FileText className="w-5 h-5 text-gray-400" /> {mat.name}</span>
                                        <button
                                            type="button"
                                            // onClick={() => handleRemoveMaterial(idx)}
                                            className="text-red-500 hover:text-red-750 cursor-pointer p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200 shadow-xs"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}