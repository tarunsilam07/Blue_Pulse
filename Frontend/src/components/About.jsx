import React from 'react'
import Navbar from './NavBar'
import aboutImage from '/about.jpg'
import Footer from './Footer'

function About() {
  return (
    <div>
        <Navbar/>
        <section class="pt-24 pb-16 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            About the Water Monitoring Project
          </h1>
          <p class="text-lg text-gray-600">
            Our mission is to ensure water quality and safety by using advanced
            technology for real-time monitoring.
          </p>
        </div>
        <div class="flex flex-col md:flex-row md:space-x-10 mb-12">
          <img
            src={aboutImage}
            alt="Project Image"
            class="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div class="mt-6 md:mt-0 md:w-1/2">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              What is the Water Monitoring Project?
            </h2>
            <p class="text-lg text-gray-600 mb-4">
              The Water Monitoring Project focuses on providing real-time
              analysis of water bodies to help ensure safety, quality, and
              sustainability. We monitor parameters such as temperature,
              humidity, gas levels, and water conditions to detect anomalies and
              improve water resource management.
            </p>
            <p class="text-lg text-gray-600">
              By using cutting-edge technology, we aim to make water monitoring
              more accessible, affordable, and actionable, helping to address
              the global water crisis.
            </p>
          </div>
        </div>
        
        <div class="bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Key Features of Our Project
          </h2>
          <ul class="list-disc list-inside space-y-4 text-gray-600">
            <li>Real-time monitoring of water parameters</li>
            <li>High-precision sensors for accurate data collection</li>
            <li>Data visualization through interactive charts and graphs</li>
            <li>Early detection of water pollution and other anomalies</li>
            <li>
              Customizable alerts and notifications for water quality issues
            </li>
            <li>
              Scalable solution for various water bodies, from small ponds to
              large reservoirs
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  )
}

export default About