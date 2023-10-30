const page = () => {
  return (
    <main className='flex flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-10 py-20 text-white lg:px-0'>
      <div className='max-w-2xl'>
        <h1 className='text-4xl font-bold'>Privacy Policy</h1>

        <h3 className='font-2xl font-bold'>Last updated: 30/10/2023</h3>
        <br />
        <p>
          Thank you for using Learning for Tzahal (&ldquo;the Service&rdquo;). We respect your privacy and are committed to protecting your personal
          information. This Privacy Policy is intended to inform you about how we collect, use, and disclose information when you use our Service,
          even though we do not collect any user data.
        </p>
        <br />

        <h2 className='font-2xl pb-3 font-bold underline'>Information We Do Not Collect</h2>

        <p>We want to make it clear that we do not collect any personal information or data from our users. This includes, but is not limited to:</p>

        <ol className='list-inside list-decimal space-y-4 py-3'>
          <li>
            <b>Personal Information:</b> We do not collect your name, email address, phone number, or any other personally identifiable information.
          </li>

          <li>
            <b>Location Information:</b> We do not access your device&rsquo;s GPS or any other location-based data.
          </li>

          <li>
            <b>Device Information:</b> We do not collect information about the device you use to access our Service, such as the device type,
            operating system, or browser information.
          </li>

          <li>
            <b>Cookies:</b> We do not use cookies or any tracking technologies to collect information about your online activities.
          </li>

          <li>
            <b>Third-Party Services:</b> We do not integrate any third-party services that would collect data from you while using our Service.
          </li>
        </ol>

        <h2 className='font-2xl pb-3 pt-6 font-bold underline'>How We Use Information (since we do not collect any)</h2>

        <p>Since we do not collect any user data, we have no information to use or share.</p>

        <h2 className='font-2xl pb-3 pt-6 font-bold underline'>Your Consent</h2>

        <p>By using our Service, you agree to this Privacy Policy and the terms outlined within it.</p>

        <h2 className='font-2xl pb-3 pt-6 font-bold underline'>Changes to this Privacy Policy</h2>

        <p>
          We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be posted on this page with
          the updated date.
        </p>

        <h2 className='font-2xl pb-3 pt-6 font-bold underline'>Contact Us</h2>

        <p>
          If you have any questions or concerns about this Privacy Policy or the way we handle your data (which is none, as we do not collect any
          data), please contact us at avicharlop [at] gmail.com.
        </p>
        <br />
        <p>
          Thank you for using Learning for Tzahal. We appreciate your trust in us, and we are committed to providing a safe and secure experience for
          our users.
        </p>
      </div>
    </main>
  )
}

export default page
