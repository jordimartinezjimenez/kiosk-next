"use client"
import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload({ image }: { image: string | undefined }) {

    const [imageUrl, setImageUrl] = useState("")

    return (
        <CldUploadWidget
            onSuccess={(res, { widget }) => {
                if (res.event === "success") {
                    widget.close()
                    // @ts-ignore
                    setImageUrl(res.info.secure_url)
                }
            }}
            uploadPreset="kiosk-next"
            options={{
                sources: ["local", "url", "camera"],
                maxFiles: 1,
                multiple: false,
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label>Product Image</label>
                        <div
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Add Image</p>
                            {/* {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        src={imageUrl}
                                        alt="Image of the product"
                                        style={{ objectFit: "contain" }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )} */}
                            {(imageUrl || image )&& (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        src={image && !imageUrl ? getImagePath(image) : imageUrl}
                                        alt="Image of the product"
                                        style={{ objectFit: "contain" }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* {image && !imageUrl && (
                        <div className="space-y-2">
                            <label>Current image:</label>
                            <div className="relative w-64 h-64">
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Image of the product"
                                    style={{ objectFit: "contain" }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    )} */}
                    <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
                </>
            )}
        </CldUploadWidget>
    )
}
