import { motion } from "framer-motion";

export function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl space-y-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Crafting Magnetic Memories Since 2020
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            India's premier custom magnet design studio, transforming cherished moments into beautiful, lasting keepsakes
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At MagnetCraft, we're passionate about turning your precious memories into beautiful, tangible keepsakes. 
              Our mission is to revolutionize how people preserve and display their special moments through innovative 
              magnet designs and cutting-edge 3D technology.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl aspect-square"></div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <h2 className="text-3xl font-bold text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Pushing boundaries with 3D design technology and premium materials for unmatched quality"
              },
              {
                title: "Customer Focus",
                description: "Dedicated to creating personalized experiences and exceeding customer expectations"
              },
              {
                title: "Sustainability",
                description: "Committed to eco-friendly materials and responsible manufacturing practices"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-xl bg-card shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "50K+", label: "Magnets Created" },
            { number: "4.9★", label: "Customer Rating" }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-4xl font-bold text-primary">{stat.number}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        {/* Team Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of designers, craftsmen, and customer experience specialists 
              work together to bring your vision to life
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}