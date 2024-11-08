"use client"

import "react-toastify/dist/ReactToastify.min.css"
import { ToastContainer } from "react-toastify"

export default function ToastNotification() {
    return (
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            style={{ userSelect: "none" }}
        />
    )
}
