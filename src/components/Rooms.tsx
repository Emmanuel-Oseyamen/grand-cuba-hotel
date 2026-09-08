
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const rooms = [
  {
    name: "Deluxe Room",
    price: "From ₦25,000",
    image: "/rooms/room-1.png",
    description:
      "Elegant accommodation featuring a king-size bed, premium bathroom, complimentary breakfast and high-speed WiFi for a truly relaxing stay.",
    features: ["King Bed", "Free WiFi", "Breakfast"],
  },
  {
    name: "Executive Room",
    price: "From ₦30,000",
    image: "/rooms/room-2.png",
    description:
      "Spacious executive accommodation with refined interiors, smart entertainment, dedicated workspace and personalized hospitality.",
    features: ["Workspace", "Smart TV", "Room Service"],
  },
];

const ROOM_DURATION = 10000;
const IMAGE_TRANSITION_DURATION = 1.1;

export default function Rooms() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % rooms.length);
    }, ROOM_DURATION);

    return () => window.clearInterval(timer);
  }, []);

  const room = rooms[current];

  return (
    <section
      id="rooms"
      className="bg-[#faf8f5] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* SECTION HEADING                                  */}
        {/* ================================================= */}

        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <p className="text-xs font-medium uppercase tracking-[4px] text-[#D4A373] sm:text-sm sm:tracking-[7px]">
            Luxury Accommodation
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl lg:text-5xl">
            Signature Rooms
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
            Beautifully designed spaces offering comfort, elegance and
            exceptional hospitality.
          </p>
        </div>

        {/* ================================================= */}
        {/* ROOM SHOWCASE                                    */}
        {/* ================================================= */}

        <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,.18)] sm:rounded-[36px] lg:rounded-[40px]">

          {/* ================================================= */}
          {/* ROOM IMAGES                                      */}
          {/*                                                     */}
          {/* Both images stay mounted at all times.            */}
          {/* This prevents a new image from having to be       */}
          {/* mounted and loaded when the room changes.         */}
          {/* ================================================= */}

          <div className="absolute inset-0">
            {rooms.map((roomItem, index) => (
              <motion.div
                key={roomItem.image}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: current === index ? 1 : 0,
                  scale: current === index ? 1.02 : 1.06,
                }}
                transition={{
                  opacity: {
                    duration: IMAGE_TRANSITION_DURATION,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 2,
                    ease: "easeOut",
                  },
                }}
                style={{
                  willChange: "opacity, transform",
                }}
              >
                <Image
                  src={roomItem.image}
                  alt=""
                  fill
                  priority={index === 0}
                  loading="eager"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  className="object-cover object-center"
                />
              </motion.div>
            ))}
          </div>

          {/* ================================================= */}
          {/* IMAGE OVERLAYS                                   */}
          {/* ================================================= */}

          {/* Main desktop overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 lg:bg-gradient-to-r lg:from-black/65 lg:via-black/25 lg:to-transparent" />

          {/* Additional mobile bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:hidden" />

          {/* ================================================= */}
          {/* ROOM INFORMATION                                 */}
          {/* ================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -25,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  ease: "easeOut",
                },
                x: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              }}
              className="relative z-10 min-h-[650px] sm:min-h-[650px] lg:h-[700px] lg:min-h-0"
            >
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:bottom-auto lg:left-auto lg:right-8 lg:top-1/2 lg:w-[420px] lg:-translate-y-1/2 lg:p-0">

                <div className="rounded-[24px] border border-white/20 bg-black/25 p-5 backdrop-blur-xl sm:rounded-[28px] sm:p-7 lg:rounded-[30px] lg:bg-white/10 lg:p-9">

                  {/* Brand */}
                  <p className="text-xs uppercase tracking-[4px] text-[#D4A373] sm:text-sm sm:tracking-[6px]">
                    Grand Cuba
                  </p>

                  {/* Room name */}
                  <h3 className="mt-2 text-3xl font-light text-white sm:mt-3 sm:text-4xl">
                    {room.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 inline-flex rounded-full bg-[#D4A373] px-4 py-2 text-sm font-semibold text-black sm:mt-5 sm:px-5 sm:text-base">
                    {room.price}/Night
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-sm leading-6 text-white/90 sm:mt-7 sm:text-base sm:leading-7 lg:mt-8 lg:leading-8">
                    {room.description}
                  </p>

                  {/* Features */}
                  <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="mt-6 flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#D4A373] px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#e0b282] active:scale-[0.98] sm:mt-8 sm:min-h-[54px] sm:text-base lg:w-fit lg:px-8"
                  >
                    Reserve This Room
                  </a>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ================================================= */}
          {/* ROOM INDICATORS                                 */}
          {/* ================================================= */}

          <div className="absolute left-1/2 top-5 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-md sm:top-6">
            {rooms.map((roomItem, index) => (
              <button
                key={roomItem.name}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`View ${roomItem.name}`}
                aria-current={current === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-[#D4A373]"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* ================================================= */}
          {/* PROGRESS BAR                                     */}
          {/* ================================================= */}

          <motion.div
            key={current}
            initial={{
              width: 0,
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: ROOM_DURATION / 1000,
              ease: "linear",
            }}
            className="absolute bottom-0 left-0 z-30 h-1 bg-[#D4A373]"
          />

        </div>
      </div>
    </section>
  );
}