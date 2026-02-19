precision highp float;

uniform float uTime;
uniform float uScrollProgress;
uniform vec2  uResolution;

varying vec2 vUv;

// ─── Simplex 3D noise ───────────────────────────────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
// ────────────────────────────────────────────────────────────────────────────

void main() {
  vec2 uv = vUv;

  // Aspect-correct UV
  float aspect = uResolution.x / uResolution.y;
  vec2 uvAspect = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.12;
  float scroll = uScrollProgress;

  // ── Noise-driven UV distortion ──────────────────────────────────────────
  float distAmp = 0.07 + scroll * 0.06;
  float n1 = snoise(vec3(uv * 2.5, t + 0.0)) * distAmp;
  float n2 = snoise(vec3(uv * 2.5 + 3.7, t + 1.3)) * distAmp;
  vec2 distortedUV = uv + vec2(n1, n2);

  // ── Base noise layers ────────────────────────────────────────────────────
  float blob1 = snoise(vec3(distortedUV * 1.8 + vec2(0.2, 0.3), t * 0.8));
  float blob2 = snoise(vec3(distortedUV * 1.2 + vec2(0.7, 0.1), t * 0.5 + 2.1));
  float blob3 = snoise(vec3(distortedUV * 3.0 + vec2(0.4, 0.8), t * 1.2 + 4.7));

  float blended = blob1 * 0.5 + blob2 * 0.35 + blob3 * 0.15;
  blended = clamp(blended * 0.5 + 0.5, 0.0, 1.0); // remap to [0,1]

  // ── Color palette keyed to scroll progress ───────────────────────────────
  // All colours are sRGB values of the design tokens
  vec3 cNavyDeep  = vec3(0.027, 0.078, 0.157);   // #071428
  vec3 cNavy      = vec3(0.043, 0.122, 0.231);   // #0B1F3B
  vec3 cNavyLight = vec3(0.071, 0.169, 0.322);   // #122B52
  vec3 cAccent    = vec3(0.145, 0.384, 0.922);   // #2563EB
  vec3 cAccentLt  = vec3(0.231, 0.510, 0.965);   // #3B82F6
  vec3 cSurface   = vec3(0.961, 0.969, 0.980);   // #F5F7FA (for light sections)

  // Section color bands (scroll 0→1 maps through 6 sections)
  // 0.00-0.15: hero              — navy + blue glow
  // 0.15-0.30: logo/stats        — very dark
  // 0.30-0.50: services          — slightly lighter dark
  // 0.50-0.65: strategic         — white surface blend
  // 0.65-0.80: case studies      — back to navy
  // 0.80-1.00: CTA / footer      — deep dark + accent
  vec3 bandA = mix(cNavy,      cNavyLight, smoothstep(0.00, 0.15, scroll));
  vec3 bandB = mix(cNavyLight, cNavyDeep, smoothstep(0.15, 0.30, scroll));
  vec3 bandC = mix(cNavyDeep,  cNavy,      smoothstep(0.30, 0.50, scroll));
  vec3 bandD = mix(cNavy,      cNavyDeep, smoothstep(0.50, 0.65, scroll));
  vec3 bandE = mix(cNavyDeep,  cNavy,      smoothstep(0.65, 0.80, scroll));
  vec3 bandF = mix(cNavy,      cNavyDeep, smoothstep(0.80, 1.00, scroll));

  // Merge bands into a single base colour
  vec3 baseDark = bandA;
  baseDark = mix(baseDark, bandB, smoothstep(0.15, 0.30, scroll));
  baseDark = mix(baseDark, bandC, smoothstep(0.30, 0.50, scroll));
  baseDark = mix(baseDark, bandD, smoothstep(0.50, 0.65, scroll));
  baseDark = mix(baseDark, bandE, smoothstep(0.65, 0.80, scroll));
  baseDark = mix(baseDark, bandF, smoothstep(0.80, 1.00, scroll));

  // Slight surface tint during light sections (0.45-0.65)
  float lightBand = smoothstep(0.45, 0.55, scroll) * (1.0 - smoothstep(0.55, 0.65, scroll));
  baseDark = mix(baseDark, cNavyLight * 0.6, lightBand * 0.3);

  // ── Glow orbs ─────────────────────────────────────────────────────────────
  // Primary orb — upper left, shifts right as user scrolls
  vec2 orb1Center = vec2(0.25 + scroll * 0.3, 0.7 - scroll * 0.2);
  float orb1 = 1.0 - smoothstep(0.0, 0.55, length(uvAspect - vec2(orb1Center.x * aspect, orb1Center.y)));
  orb1 = pow(max(orb1, 0.0), 2.5);

  // Secondary orb — lower right
  vec2 orb2Center = vec2(0.75 - scroll * 0.2, 0.25 + scroll * 0.3);
  float orb2 = 1.0 - smoothstep(0.0, 0.45, length(uvAspect - vec2(orb2Center.x * aspect, orb2Center.y)));
  orb2 = pow(max(orb2, 0.0), 3.0);

  // Centre pulse (driven by noise)
  float pulse = (snoise(vec3(0.5, 0.5, t * 0.7)) * 0.5 + 0.5) * 0.3;

  // Mix accent colour into glow orbs
  vec3 colour = baseDark;
  colour = mix(colour, cAccent,   orb1 * 0.28);
  colour = mix(colour, cAccentLt, orb2 * 0.18);
  colour += cAccent * blended * 0.06 * (1.0 - scroll * 0.5);
  colour += cNavyLight * pulse * 0.12;

  // ── Vignette ─────────────────────────────────────────────────────────────
  float vignette = smoothstep(0.0, 0.6, 1.0 - length((uv - 0.5) * 1.4));
  colour = mix(cNavyDeep, colour, vignette * 0.85 + 0.15);

  // ── Subtle grain ─────────────────────────────────────────────────────────
  float grain = snoise(vec3(uv * 150.0, t * 5.0)) * 0.012;
  colour += grain;

  gl_FragColor = vec4(clamp(colour, 0.0, 1.0), 1.0);
}
