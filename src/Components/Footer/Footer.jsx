import React from 'react'
import { Link } from 'react-router-dom'
import { Logo} from '../index'

export default function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-sl bg-black">

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                
                <span className="text-lg font-bold"><Logo width='100px'></Logo></span>
              </div>
              <div>
                <p className="mb-4 text-base font-medium">The Tailwind CSS Component library</p>
                <p className="text-sm text-gray-100">
                  &copy; Copyright 2022. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-[#ffffff]">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium text-gray-200 hover:text-gray-300" to="#">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
