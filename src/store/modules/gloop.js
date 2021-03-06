/**
 * Shout out to @iridule for the shader from which I derived this sketch.
 * https://www.shadertoy.com/view/MsyBRm
 */

export default {
  namespaced: true,
  state: {
    shader: `
      #define PI 3.14159265358979323846264338327950
      #define TWO_PI PI * 2.0
      float map(float v, float a, float b, float c, float d) {
        return c + ((v - a)/(b - a)) * (d - c);
      }
      float circle(vec2 p, vec2 center, float radius, float l) {
        float d = distance(p, center);
        return smoothstep(radius, l, d);
      }
      mat2 rotate(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
      mat2 scale(float a) { return mat2(a, 0, 1, a);    }
      void main () {
        vec2 p = .6 * gl_FragCoord.xy/resolution.xy - .5;
        p.x *= .5 * (resolution.x / resolution.y);
        p *= rotate(((p.y - stream/150.)));
        p *= .5 * p.y *  scale(1.);
        vec2 cen = vec2(.5);
        vec2 corn = vec2(0.0);
        float md = distance(corn, cen);
        float d = distance(p, cen);
        float a = map(d, 0.0, md, 0.0, TWO_PI * 1.0);
        float col = circle(p -.5, cen - 0.5, 0.1, 0.8);
        float inner = map((cos(stream * p.x) / 100.0 * sin(p.x)), -1.0, 1.0, 1.0, 1.0);
        float radius = length(p - .5) * .5 - inner;
        float angle = atan(p.y - .5, p.x -.5) / PI;
        float spin = map((p.y*p.x), -1., 1., 1., .2);
        float spiral = a - spin;
        float arms = angle * TWO_PI *20.0;
        col += sin(arms + spiral) - radius;
        col *= sin(arms - spiral) - radius;  
        col *= sin(arms - spiral) + radius;         
        col *= sin(arms + spiral + (stream / 20.0)) + radius;
        vec3 mix1 = mix(
          vec3(0, 0, 0),
          vec3(1, 1.0, 1.0),
          sin(spiral + stream/5000.)
        );
        vec3 mix2 = mix(
          vec3(1., cos(p.y/10.), 0.),
          vec3(p.x/1., cos(p.x/10. - stream/5000.), cos(p.y/100.)),
          cos(arms * spiral) * col
        );
        vec3 color = mix(mix1, mix2, col );
        gl_FragColor -= vec4((color), 1);
        gl_FragColor.bg *= cos(time/1000.); 
      }
    `,
    queues: [{
      name: 'gloop-size',
      totalSamples: 100,
      smoothing: 5
    }, {
      name: 'gloop-beat',
      totalSamples: 600,
      smoothing: 60
    }],
    uniforms: {
      xBase: {
        value: 2,
        min: 0,
        max: 5
      },
      xTick: {
        value: 11,
        max: 15,
        min: 0
      }
    }
  }
}