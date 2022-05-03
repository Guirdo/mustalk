import Head from "next/head";

function AuthLayout({ title, children }) {
    return (
        <>
         <Head>
             <title>MusTalk{title && ` - ${title}`}</title>
         </Head>
            <div className="auth-section">
                {children}
            </div>
        </>
    );
}

export default AuthLayout;