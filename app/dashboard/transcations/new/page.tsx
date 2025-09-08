import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const NewTranscationPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-10">
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/dashboard"}>
                            Dashboard
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator    />

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/dashboard/transcations"}>
                            Transcations
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator    />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        New Transcation
                    </BreadcrumbPage>
                </BreadcrumbItem>
                
            </BreadcrumbList>
        </Breadcrumb>

        <Card className="mt-4 max-w-screen-md">
            <CardHeader>
                <CardTitle >
                    New Transcation
                </CardTitle>
            </CardHeader>
            <CardContent>
                form 
            </CardContent>

        </Card>
    </div>
  )
}

export default NewTranscationPage