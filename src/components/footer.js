import React from "react";

export default function Footer() {
    return (
        <footer className="footer mt-auto py-3 text-muted bg-dark">
            <div className="container">
                Copyright { new Date().getFullYear() } | All Rights Reserved | Troop 68
            </div>
        </footer>
    );
};