"use client";

import { Card, CardHeader, CardFooter, Button } from "@heroui/react";
import Image from "next/image";

const AppointmentCard = ({ appointment }) => {
      return (
            <Card className="p-4 shadow-md group hover:shadow-lg transition-all duration-300 rounded-xl">
                  {/* Image */}
                  <div className="relative w-full h-[200px] overflow-hidden rounded-xl">
                        <Image
                              src={appointment.image}
                              alt={appointment.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                  </div>

                  {/* Header */}
                  <CardHeader className="flex flex-col items-start gap-1 mt-3">
                        <h2 className="text-xl font-semibold text-gray-900">
                              {appointment.name}
                        </h2>
                        <p className="text-sm text-blue-600 font-medium">
                              {appointment.specialty}
                        </p>
                  </CardHeader>

                  {/* Info */}
                  <div className="px-4 py-2 space-y-1 text-sm text-gray-700">
                        <p>
                              <span className="font-semibold">Experience:</span>{" "}
                              {appointment.experience}
                        </p>
                        <p>
                              <span className="font-semibold">Hospital:</span>{" "}
                              {appointment.hospital}
                        </p>
                        <p>
                              <span className="font-semibold">Location:</span>{" "}
                              {appointment.location}
                        </p>

                        {/* Highlight Fee */}
                        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                              Fee: ৳{appointment.fee}
                        </div>
                  </div>

                  {/* Footer */}
                  <CardFooter>
                        <Button
                              color="primary"
                              className="w-full font-medium rounded-full"
                        >
                              View Details
                        </Button>
                  </CardFooter>
            </Card>
      );
};

export default AppointmentCard;