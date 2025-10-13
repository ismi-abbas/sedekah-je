import GetdoaFooter from "@/components/getdoa-footer";
import PageFooter from "@/components/page-footer";
import PageHeader from "@/components/page-header";
import { Header } from "@/components/ui/header";
import PageSection from "@/components/ui/pageSection";
import { getInstitutionBySlug } from "@/lib/queries/institutions";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
import { InstitutionPageClient } from "./_page-client";

const getData = createServerFn()
	.inputValidator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const institution = await getInstitutionBySlug(data.slug);
		return { institution };
	});

export const Route = createFileRoute("/$institution/$slug/")({
	component: InstitutionPage,
	loader: async ({ params }: { params: { slug: string } }) => {
		return await getData({
			data: { slug: params.slug },
		});
	},
});

function InstitutionPage() {
	const { slug } = Route.useParams();
	const { institution } = Route.useLoaderData();

	// if (!institution) {
	// 	notFound();
	// }

	return (
		<>
			<Header />
			<PageSection>
				<PageHeader pageTitle={institution.name} showHeader={false} />
				<InstitutionPageClient institution={institution} />
				{/* <PageFooter /> */}
				{slug}
				<Suspense fallback={<div>Loading...</div>}>
					<GetdoaFooter />
				</Suspense>
				<PageFooter />
			</PageSection>
		</>
	);
}
