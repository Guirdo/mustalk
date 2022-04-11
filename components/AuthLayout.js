import Head from "next/head";

function AuthLayout({ title, children }) {
    return (
        <>
         <Head>
             <title>MusTalk{title && ` - ${title}`}</title>
         </Head>
            <div className="container auth p-md">
                {children}
            </div>
        </>
    );
}

export default AuthLayout;