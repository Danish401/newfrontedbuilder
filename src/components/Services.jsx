import React from 'react';

const services = [
  {
    title: 'Custom Form Design',
    description: 'We help you design forms tailored to your brand and workflow, using beautiful templates and advanced logic.',
    icon: '🎨',
  },
  {
    title: 'Instant Sharing',
    description: 'Share your forms with a link, QR code, or embed them on your website. Collect responses in real time.',
    icon: '🚀',
  },
  {
    title: 'Data Analysis & Export',
    description: 'Analyze responses with built-in charts, export to PDF/CSV, and integrate with your favorite tools.',
    icon: '📈',
  },
  {
    title: 'Priority Support',
    description: 'Get fast, friendly support from our team whenever you need help or have questions.',
    icon: '💬',
  },
];

const Services = () => {
  return (
    <div className="bg-asphalt-50 min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-asphalt-800 mb-4">Our Services</h1>
        <p className="text-lg text-asphalt-700 mb-4">
          We offer a range of services to help you create, share, and analyze forms with ease and style.
        </p>
      </div>
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md border border-asphalt-200 p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-asphalt-700 mb-2">{service.title}</h3>
            <p className="text-asphalt-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services; 