"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { CalendarIcon, PlusCircle, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { pdf } from "@react-pdf/renderer"
import PDFLayout from "./_components/pdf-page"

const formSchema = z
  .object({
    date: z.date(),
    unit: z.string(),
    activity: z.string(),
    time: z.date(),
    place: z.string(),
    duration: z.string(),
    goal: z.string(),
    concerned: z.string(),
    amount: z.coerce.number(),
    requirements: z.string(),
    leader: z.string(),
    divisions: z.array(
      z.object({
        name: z.string(),
        value: z.coerce.number(),
      }),
    ),
  })
  .refine(
    (data) => {
      const sum = data.divisions.reduce((acc, item) => acc + item.value, 0)
      return sum === data.amount
    },
    {
      message: "مجموع القيم يجب أن يساوي المبلغ الإجمالي",
      path: ["divisions"],
    },
  )

export default function Home() {
  const pdfRef = useRef<HTMLDivElement>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      unit: "كشاف",
      activity: "إفطار + مبيت",
      time: new Date("2021-04-27"),
      place: "المدرسي",
      duration: "الفترة المسائية",
      goal: "إحياء الأجواء الرمضانية والتعارف بين الفتية الملتحقين",
      concerned: "3 طلائع",
      amount: 250,
      requirements: "الزي الرسمي - الفوج - كاميرا",
      leader: "محمد ياسين بلهادي",
      divisions: [
        { name: "النقل", value: 100 },
        { name: "شاي + صباح", value: 50 },
        { name: "سحور", value: 100 },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "divisions",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const sum = values.divisions.reduce((acc, item) => acc + item.value, 0)
    if (sum !== values.amount) {
      setValidationError(`مجموع القيم (${sum}) يجب أن يساوي المبلغ الإجمالي (${values.amount})`)
      return
    }
  
    const preparedData = {
      ...values,
      date: `${values.date.getFullYear()}/${values.date.getMonth() + 1}/${values.date.getDate()}`,
      time: `${values.time.getFullYear()}/${values.time.getMonth() + 1}/${values.time.getDate()}`,
    }
  
    const blob = await pdf(<PDFLayout data={preparedData} />).toBlob()
    const url = URL.createObjectURL(blob)
  
    const link = document.createElement("a")
    link.href = url
    link.download = "الكشافة.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url) // libérer la mémoire
  
    setValidationError(null)
  }

  // Watch amount to validate divisions sum
  const amount = form.watch("amount")
  const divisions = form.watch("divisions")

  useEffect(() => {
    const sum = divisions?.reduce((acc, item) => acc + (item.value || 0), 0) || 0
    if (sum !== amount && divisions?.length > 0) {
      setValidationError(`مجموع القيم (${sum}) يجب أن يساوي المبلغ الإجمالي (${amount})`)
    } else {
      setValidationError(null)
    }
  }, [amount, divisions])

  // Hide PDF template on initial render
  useEffect(() => {
    if (pdfRef.current) {
      pdfRef.current.style.display = "none"
    }
  }, [])

  return (
    <main className="container px-2 mx-auto py-10 rtl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-right">نموذج البيانات</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>التاريخ</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-right font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: ar }) : <span>اختر تاريخ</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>بطـاقة فنيـة لـوحدة</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger dir="rtl" className="w-full">
                          <SelectValue placeholder="اختر الوحدة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent dir="rtl">
                        <SelectItem value="اشبال">اشبال</SelectItem>
                        <SelectItem value="كشاف">كشاف</SelectItem>
                        <SelectItem value="متقدم">متقدم</SelectItem>
                        <SelectItem value="جوال">جوال</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>النشـاط</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>الزمـان</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-right font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: ar }) : <span>اختر زمان</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المكـان</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المــدة</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الهدف</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="concerned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المعنيـون</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مبلـغ الاشتــراك (دج)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">طريقة تقسيم المبلغ</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", value: 0 })}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  إضافة تقسيم
                </Button>
              </div>

              {validationError && (
                <Alert variant="destructive">
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`divisions.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>التقسيم</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`divisions.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>القيمة (دج)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="mb-2">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المستلزمات</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leader"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>القــائد</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              تقديم وتحميل PDF
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-full flex justify-center p-4 items-center">

      </div>

    </main>
  )
}

