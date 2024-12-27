import { LoginForm } from '@/sections/LoginForm'
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <img src="https://cloud.appwrite.io/v1/storage/buckets/6765793a001f9645b743/files/67657e95000bec2c5855/view?project=674323fe0025f781b5f0&project=674323fe0025f781b5f0&mode=admin" alt="Logo" />
            </div>
            Ghinasepti Travel Umroh dan Haji Khusus
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img 
          src='https://cloud.appwrite.io/v1/storage/buckets/6765793a001f9645b743/files/676579f900143a2c70b0/view?project=674323fe0025f781b5f0&project=674323fe0025f781b5f0&mode=admin'
          alt='Login Image'
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}
