const ContactPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <h1 className="text-4xl font-semibold mb-8">Contacto</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Asunto
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mensaje
              </label>
              <textarea
                rows={6}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-lama text-white py-2 px-4 rounded-3xl mt-4"
            >
              Enviar mensaje
            </button>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Dirección</h3>
                <p className="text-gray-600">
                  Calle Principal 123
                  <br />
                  Ciudad, País
                </p>
              </div>

              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">info@turibue.com</p>
              </div>

              <div>
                <h3 className="font-medium">Teléfono</h3>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>

              <div>
                <h3 className="font-medium">Horario de atención</h3>
                <p className="text-gray-600">
                  Lunes a Viernes: 9:00 - 18:00
                  <br />
                  Sábados: 10:00 - 14:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 