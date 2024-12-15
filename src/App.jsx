import { useState } from "react";
import MainScene from "./components/MainScene";

function App() {
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1>Snaptrude Assignment</h1>
        <h3>Pranshu Kumar Gond</h3>
        <div>
          <h3 className="text-gray-600">Outline Shading</h3>
          <p className="text-gray-400">December 15th, 2024</p>
        </div>

        <div className="h-0.5 w-full bg-gray-400" />
        <div className="flex flex-col justify-between items-start gap-5">
          <MainScene />
          <div>
            <h2>How I achieved Outline Shading?</h2>
            <p className="mt-2">
              The biggest challenge in this assignment was how to get an outline
              of a mesh when it's <i>overlapping</i> with other meshes.
            </p>
            <p>
              My first solution involved creating a clone out of the mesh when
              the pointer is over it, and scaling it up by a factor - in our
              case, this is the <code>outlineThickness</code>. Also, in the
              fragment shader, all I had to do was give it the desired color (
              <code>outlineColor</code>)
            </p>
            <p>
              To ensure that the scaled up mesh doesn't overlap with the
              original mesh, I set the <code>depthTest</code> parameter as true.
              What this did was it ensured that the renderer uses the{" "}
              <b>Depth Buffer</b> value to determine whether to draw the
              fragment or not. However, the issue was that the outlines hid
              behind overlapping meshes!
            </p>
            <p className="mt-2">
              After looking at the{" "}
              <a
                href="https://threejs.org/examples/?q=outline#webgl_postprocessing_outline"
                className="underline text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Three JS Outline Effect Example
              </a>{" "}
              I realised, it would be better to use <b>Post Processing.</b> Now,
              the example uses{" "}
              <b>
                <i>Sobel Filters</i>
              </b>{" "}
              to detect edges in the fragment shader. I decided to go with an
              easier approach.
            </p>
            <div className="flex mt-5 justify-between items-start gap-10">
              <div>
                <h3>The Custom Outline Effect!</h3>
                <p>
                  In this{" "}
                  <a
                    href="https://ameye.dev/notes/rendering-outlines/"
                    target="_blank"
                    className="underline text-blue-600"
                    rel="noopener noreferrer"
                  >
                    blog
                  </a>
                  , a neat technique is mentioned to create outlines around
                  meshes. The idea is quite simple, create a{" "}
                  <b>
                    <i>Silhouette buffer</i>
                  </b>
                  , map the selected mesh onto the buffer and give it a white
                  colour. The texture from this buffer is then used to determine
                  the outline of the mesh in the fragment shader.
                </p>
                <p>
                  I pass the texture of
                  the frame buffer (after the mask pass) to the fragment shader.
                  The goal of the fragment shader is quite simple - look for the
                  r value of the neighbouring pixels (all the 4 directions). Use
                  these values to calculate the difference in the r values in
                  either direction. A simple <code>sqrt(dx * dx + dy * dy)</code> gives the
                  deviation in the r values across neighbouring pixels. Then, I
                  clamp this value between 0 and 1 and use it to interpolate
                  between the outline colour and the base colour for a smooth
                  transition.
                </p>
                <p>
                  The texture of the Silhouette buffer can be viewed from the Edit menu. When
                  hovered over a mesh, it creates a white silhouette of the
                  object.
                </p>
              </div>
            </div>
          </div>
          <div className="h-0.5 w-full bg-gray-400" />
        </div>
      </div>
    </>
  );
}

export default App;
