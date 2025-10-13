import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { getInstitutions } from "@/lib/queries/institutions";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Suspense } from "react";
import { PageClient } from "./page-client";

const getData = createServerFn().handler(async () => {
	return await getInstitutions();
});

type SearchParams = {
	search?: string;
	category?: string;
	state?: string;
	page?: string;
};

type Props = {
	searchParams: SearchParams;
};

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getData(),
});

function Home() {
	const institutions = useLoaderData({ from: Route.id });
	const { search, category, state, page }: SearchParams = Route.useSearch();

	return (
		<>
			<Header />
			<Suspense fallback={<HomeLoading />}>
				<PageClient
					initialInstitutions={institutions}
					initialSearchParams={{
						category: category || "",
						state: state || "",
						search: search || "",
						page: page || "1",
					}}
				/>
			</Suspense>
		</>
	);
}

function HomeLoading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 15 }).map((_, idx) => (
					<Card key={idx} className="aspect-square w-full">
						<Skeleton className="min-h-full min-w-full" />
					</Card>
				))}
			</div>
		</div>
	);
}
