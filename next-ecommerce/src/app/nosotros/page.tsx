import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8">
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
        <Image
          src="/about-hero.jpg"
          alt="Sobre nosotros"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-semibold">
            Sobre Turibue
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 leading-relaxed">
            Turibue nació de la pasión por compartir experiencias únicas...
            [Completar con la historia real]
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-600 leading-relaxed">
            Conectar a las personas con experiencias memorables...
            [Completar con la misión real]
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Aquí podrías mapear el equipo real */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={`/team-member-${i + 1}.jpg`}
                    alt={`Miembro del equipo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium">Nombre del miembro</h3>
                <p className="text-gray-600">Cargo</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 