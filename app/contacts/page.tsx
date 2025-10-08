import ContactTable from "@/components/contact-table";
import Seacrh from "@/components/seacrh";
import { CreateButton } from "@/components/buttons";
import { getContactPages } from "@/lib/data";
import Pagination from "@/components/paginationi";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeleton";

const Contacts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getContactPages(query);

  return (
    <div className="max-w-screen-md mx-auto mt-5 ">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Seacrh />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contacts;
