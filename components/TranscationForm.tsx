"use client"

import { any, z } from "zod"
import { addDays } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"
import { type Category } from "@/types/Category"

const transcationFormSchema = z.object({
        transcationType : z.enum(["Income", "Expense"]),
        categoryId : z.coerce.number().positive("Please select a category."),
        transcationDate : z.coerce.date().max(addDays(new Date(), 1), "Please select a past date."),
        amount : z.coerce.number().positive("Amount must be greater than zero."),
        description : z.string().min(3, "Description is required.").max(250, "Description must be under 250 chars."),

})

const TranscationForm = ({
    categories
}:{
    categories:Category[]
}) => {
    const form = useForm<z.infer<typeof transcationFormSchema>>({
        resolver: zodResolver(transcationFormSchema),
        defaultValues:{
            amount: 0,
            categoryId : 0,
            description : " ",
            transcationDate : new Date(),
            transcationType : "Income"
        }
    })
    const handleFormSubmit = async (data : z.infer<typeof transcationFormSchema>) =>{};

    const transcationType = form.watch('transcationType')
    const filterCategories = categories.filter(category => category.type === transcationType);



    return (
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <fieldset className="grid grid-cols-2 gap-y-5 gap-x-2"> 

                <FormField control={form.control} name="transcationType" render={({field})=>{
                return (
                    <FormItem>
                        <FormLabel>
                            Transcation type
                        </FormLabel>

                        <FormControl>
                            <Select 
                                onValueChange={(newValue) =>{
                                 field.onChange(newValue)
                                 form.setValue("categoryId", 0)
                                }} 
                                     value={field.value}
                                 >
                                <SelectTrigger className="w-full">
                                    <SelectValue    />
                                </SelectTrigger >
                                <SelectContent>
                                    <SelectItem  value="Income">
                                        Income
                                    </SelectItem>
                                    <SelectItem value="Expense">
                                        Expense
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
            }} />

            <FormField control={form.control} name="categoryId" render={({field})=>{
                return (
                    <FormItem className="">
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl >
                            <Select onValueChange={field.onChange} value={field.value.toString()}>
                                <SelectTrigger className="w-full">
                                    <SelectValue    />
                                </SelectTrigger>
                                <SelectContent>
                                    {filterCategories.map((category)=>(
                                        <SelectItem 
                                            key={category.id}
                                            value={category.id.toString()}
                                        >
                                            {category.name}

                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
            }} />

            <FormField control={form.control} 
            name="transcationDate" render={({field})=>{
                return (
                    <FormItem>
                        <FormLabel>
                            Transcation Date
                        </FormLabel>
                        <FormControl>
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    data-empty={!field.value}
                                    className={cn(
                                        "w-full justify-start text-left font-normal"
                                    , !field.value && "text-muted-foreground")}
                                    >
                                    <CalendarIcon />
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} 
                                    disabled={
                                        {after: new Date()}
                                    }
                                    />
                                </PopoverContent>
                                </Popover>

                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
            }} />

            <FormField control={form.control} 
            name="amount" render={({field})=>{
                return (
                    <FormItem className="">
                        <FormLabel>
                            Amount
                        </FormLabel>
                        <FormControl >
                            <Input {...field} type="number" />

                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
            }} />
            
            </fieldset>

            <fieldset className="mt-5 flex flex-col gap-5 ">
                <FormField control={form.control} name="description" render={({field})=>{
                return (
                    <FormItem className="">
                        <FormLabel>
                            Description
                        </FormLabel>
                        <FormControl >
                            <Input {...field} />

                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )
            }} />
            <Button type="submit"  className="bg-slate-700 text-white/70 text-lg border border-slate-700 ">
                Submit
            </Button>
            </fieldset>
            </form>
        </Form>
  )
}

export default TranscationForm