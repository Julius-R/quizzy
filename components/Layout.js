import Head from "next/head";

export default function Layout({ children, title }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content="A quiz app I built with Next.js"
				/>
			</Head>
			{children}
		</div>
	);
}
