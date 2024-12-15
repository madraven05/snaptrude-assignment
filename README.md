# Snaptrude Assignment

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/madraven05/snaptrude-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd snaptrude-assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## ✅ Task 1

### 1. Adding simple meshes

Added meshes using React Three Fiber inbuild mesh builders

```html
<mesh
onPointerOver={handlePointerOver}
onPointerLeave={handlePointerLeave}
position={[0, 0, 0]}
>
    <sphereGeometry args={[5]} />
    <meshStandardMaterial color={"purple"} />
</mesh>
```

### 2. Adding custom `.obj` mesh
Used `useLoader()`, `MTLLoader` and `OBJLoader` provided by React Three Fiber for loading meshes.
> Have a look at[`Bench.jsx`](https://github.com/madraven05/snaptrude-assignment/blob/main/src/components/objects/Bench.jsx)!

### 3. Positioning Meshes
Positioning meshes is quite easy. All you have to do is add a parameter `position` and pass the vector position of the mesh (in world space)

## ✅ Task 2
### 1. Pointer Hover Operations
All the `JSX.IntrinsicElements` provided by three and React Three Fiber have various pointer event handlers. I made use of `onPointerOver` and `onPointerLeave`. 
The parameter is of type `ThreeEvent<PointerEvent>` from which one can access the object. 
```jsx
const handlePointerOver = (e) => {
    e.stopPropagation();
    setSelectedObject(e.object);
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setSelectedObject(null);
  };
```

### 2. Outline Shader
The shader was created using the following steps.
### Silhouette Mask Pass
Firstly, I create a ***Silhouette*** of the object that is selected via the pointer event. I also create a *Frame Buffer Object*, that is used as the render target for this pass.

I traverse over the scene objects and check if it is similar as the selected object and if it is, I set the color of the object as white. If it's not the case, I set it's visibility to false (Do not render).

### Outline Fragment Shader
I pass the texture of the frame buffer (after the mask pass) to the fragment shader. The goal of the fragment shader is quite simple - look for the `r` value of the neighbouring pixels (all the 4 directions). Use these values to calculate the difference in the `r` values in either direction. 

A simple `sqrt(dx * dx + dy * dy)` gives the deviation in the `r` values across neighbouring pixels. Then, I clamp this value between 0 and 1 and use it to interpolate between the outline colour and the base colour for a smooth transition.

## ✨ Bonus Task
The outline edit panel allows the user to control outline thickness and outline color. It also provides an additional functionality to view the Frame Buffer Texture realtime. A nice addition to visualise how the mask pass creates silhouettes of the selected meshes!

## 📃 References
- https://ameye.dev/notes/rendering-outlines/
- [React Three Fiber Docs](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [ThreeJS Examples](https://threejs.org/examples/)
- `ChatGPT` for help with syntax, semantics and research 
