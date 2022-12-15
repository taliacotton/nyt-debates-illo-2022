// @path-json can be an object or an array, the first will be loaded directly, the object from the array will be random selected
/* tsParticles.loadJSON(@dom-id, @path-json, @callback (optional)); */


//tsParticles library - https://github.com/matteobruni/tsparticles

//saving names of all emoji files in an array so we don't need any extra code or server work
let emojiFileNames = ["1f9d0","1f60a","1f60b","1f60c","1f60d","1f61d","1f61e","1f61f","1f62a","1f62b","1f92b","1f92c","1f92d","1f92e","1f92f","1f604","1f605","1f606","1f607","1f608","1f614","1f615","1f616","1f617","1f618","1f624","1f625","1f626","1f627","1f628","1f634","1f635","1f636","1f637","1f637","1f641","1f912","1f913","1f914","1f915","1f917","1f927","1f928","1f929","1f970","1f971"];

//creating an array of image "objects" with the information needed (src, width and height) for the library
let imageObjectArray = [];
for (let emoji of emojiFileNames) {
    let imageObject = {
        // src: `/emojis/${emoji}.png`,
        src: `https://github.com/taliacotton/nyt-debates-illo-2022/blob/main/emojis/${emoji}.png?raw=true`,
        width: 100,
        height: 100
    };
    imageObjectArray.push(imageObject);
}


tsParticles
    .load("tsparticles", {
        fpsLimit: 60,
        backgroundMode: {
        enable: true,
        zIndex: 10
        },
        particles: {
        number: {
            value: 150,
            density: {
            enable: true,
            area: 1000
            }
        },
        destroy: {
            mode: "split",
            split: {
            count: 1,
            factor: {
                value: 9,
                random: {
                enable: true,
                minimumValue: 4
                }
            },
            rate: {
                value: 30,
                random: {
                enable: true,
                minimumValue: 5
                }
            },
            particles: {
                collisions: {
                enable: false
                },
                destroy: {
                mode: "none"
                },
                life: {
                count: 1,
                duration: {
                    value: 2
                }
                }
            }
            }
        },
        shape: {
            type: "image",
            stroke: {
            width: 0,
            color: "#000000"
            },
            polygon: {
            sides: 5
            },
            image: imageObjectArray
        },
        opacity: {
            value: 1,
            random: false,
        },
        size: {
            value: 16,
            random: {
            enable: true,
            minimumValue: 16
            },
        },
        collisions: {
            enable: true,
            mode: "destroy"
        },
        move: {
            enable: true,
            speed: 13,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
            }
        }
        },
        interactivity: {
        detectsOn: "window",
        events: {
            onClick: {
            enable: true,
            mode: "push"
            },
            resize: true
        },
        modes: {
            push: {
                particles_nb: 1
            },
            remove: {
                particles_nb: 2
            }
        }
        },
        detectRetina: true
    })
    .then((container) => {
        console.log("callback - tsparticles config loaded");
    })
    .catch((error) => {
        console.error(error);
    });

//or

/* tsParticles.load(@dom-id, @options); */

// tsParticles.load("tsparticles", {
//   /* options here */
// });

// //or

// /* tsParticles.loadFromArray(@dom-id, @options, @index (optional)); */

// tsParticles.loadFromArray("tsparticles", [
//   {
//     /* options here */
//   },
//   {
//     /* other options here */
//   },
// ]);
// //random object

// tsParticles.loadFromArray(
//   "tsparticles",
//   [
//     {
//       /* options here */
//     },
//     {
//       /* other options here */
//     },
//   ],
//   1
// ); //the second one
// // Important! If the index is not in range 0...<array.length, the index will be ignored.

// // after initialization this can be used.

// /* tsParticles.setOnClickHandler(@callback); */

// /* this will be fired from all particles loaded */

// tsParticles.setOnClickHandler((event, particles) => {
//   /* custom on click handler */
// });

// // now you can control the animations too, it's possible to pause and resume the animations
// // these methods don't change the config so you're safe with all your configurations
// // domItem(0) returns the first tsParticles instance loaded in the dom
// const particles = tsParticles.domItem(0);

// // play will start the animations, if the move is not enabled it won't enable it, it just updates the frame
// particles.play();

// // pause will stop the animations
// particles.pause();