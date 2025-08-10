import React from "react"; 

    export default function ErrorCard({ message }: { message: string }) {
        return (
        <div className="border border-red-400 bg-red-100 text-red-700 p-4 rounded-md text-center">
            {message}
        </div>
        );
    }