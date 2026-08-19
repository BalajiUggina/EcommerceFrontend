import ContactHeader from "@/src/components/contact/ContactHeader";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <div className="max-w-360 mx-auto p-10">
      <ContactHeader />

      <div className="mt-5 flex flex-col lg:flex-row gap-12 justify-between">
        <div className="w-[340px] h-[457px] bg-white rounded-sm p-10 shadow-sm">
          {/* Call To Us */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <img src="/icons/phone.svg" alt="Phone" className="w-5 h-5" />
              </div>

              <h3 className="text-[16px] font-medium leading-6 text-black">
                Call To Us
              </h3>
            </div>

            <p className="text-[14px] font-normal text-black mb-4">
              We are available 24/7, 7 days a week.
            </p>

            <p className="text-[14px] font-normal text-black">
              Phone: +8801611112222
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-black/20 my-8" />

          {/* Write To Us */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <img src="/icons/mail.svg" alt="Mail" className="w-5 h-5" />
              </div>

              <h3 className="text-[16px] font-medium leading-6 text-black">
                Write To Us
              </h3>
            </div>

            <p className="text-[14px] font-normal text-black mb-4">
              Fill out our form and we will contact you within 24 hours.
            </p>

            <p className="text-[14px] font-normal text-black mb-4">
              Emails: customer@exclusive.com
            </p>

            <p className="text-[14px] font-normal text-black">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>
        <ContactForm/>
      </div>
    </div>
  );
}
