// More calculation generators: every common exam calculation gets new numbers each time.
(function(){
if(typeof GEN==='undefined') return;
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const r2=x=>Math.round(x*100)/100;
const f=x=>{const r=r2(x);return (r<0?'−':'')+Math.abs(r).toLocaleString('en-US',{maximumFractionDigits:2});};
const co=n=>n===1?'':f(n);
const num=(q,a,tol,e,st)=>({t:'num',q,a:r2(a),tol:tol||0.01,e,st});
const add=(u,fns)=>{ GEN[u]=GEN[u]||[]; GEN[u].push(...fns); };

add('u1',[
 ()=>{let a,b,d,c,Y,p;do{b=R(2,8);d=R(2,8);p=R(10,40);c=pick([0.05,0.1,0.2]);Y=R(5,20)*100;a=(b+d)*p-c*Y;}while(a<20||a!==Math.round(a));
  return num(`Demand: Q = ${a} − ${co(b)}p + ${f(c)}Y, where Y is income. Supply: Q = ${co(d)}p. Income is Y = ${Y}. What is the equilibrium price?`,p,0.01,
   `With Y = ${Y}: Q<sub>d</sub> = ${a+c*Y} − ${co(b)}p. ${a+c*Y} − ${b}p = ${d}p gives p = ${p}.`,
   [`Plug in income: ${a} + ${f(c)}·${Y} = ${a+c*Y}, so Q<sub>d</sub> = ${a+c*Y} − ${co(b)}p.`,`Set equal to supply: ${a+c*Y} − ${b}p = ${d}p.`,`${a+c*Y} = ${b+d}p ⇒ p = ${p}.`,'!Plug in the shift variables first, then solve for p.']);},
 ()=>{let c,d,p,Q;do{c=pick([-30,-20,-12,-10,10,20,40,50]);d=R(2,8);p=R(5,30);Q=c+d*p;}while(Q<=10);
  const e=d*p/Q;
  return num(`Supply: Q = ${c<0?'−'+(-c)+' + ':c+' + '}${co(d)}p. What is the price elasticity of supply at p = ${p}? (two decimals)`,e,0.006,
   `Q = ${Q}. η = ${d}·${p}/${Q} = ${f(e)}.`,
   ['η = (dQ/dp)·(p/Q).',`dQ/dp = ${d}, and Q = ${c} + ${d}·${p} = ${Q}.`,`η = ${d}·${p}/${Q} = ${f(e)}.`,c<0?'The curve hits the price axis above zero, so supply is elastic (η &gt; 1).':'The curve hits the quantity axis above zero, so supply is inelastic (η &lt; 1).','!Linear supply through the origin: η = 1 everywhere.']);},
 ()=>{const b=R(1,6),p=R(5,40),a=2*b*p;
  return num(`Demand: Q = ${a} − ${co(b)}p. At what price is total revenue largest?`,p,0.01,
   `Revenue is largest where ε = −1, at the midpoint: p = ${a}/(2·${b}) = ${p}.`,
   [`R = p(${a} − ${b}p) = ${a}p − ${b}p<sup>2</sup>.`,`dR/dp = ${a} − ${2*b}p = 0 ⇒ p = ${p}.`,`Check: ε = −${b}·${p}/${a-b*p} = −1.`,'!Linear demand: revenue peaks at the midpoint, where ε = −1.']);},
 ()=>{const k=pick([0.4,0.5,0.8,1.2,1.5,2,3]),x=pick([2,3,4,5,6,8,10]),A=R(10,200),dir=pick([1,-1]);
  return num(`Demand: Q = ${A}p<sup>−${f(k)}</sup>. The price ${dir>0?'rises':'falls'} by ${x} %. By approximately how many percent does quantity change? (minus sign for a fall)`,-k*x*dir,0.01,
   `Constant elasticity −${f(k)}: %ΔQ ≈ −${f(k)}·(${dir>0?'+':'−'}${x} %) = ${f(-k*x*dir)} %.`,
   [`For Q = A·p<sup>ε</sup> the elasticity is the exponent: ε = −${f(k)}.`,'%ΔQ ≈ ε·%Δp.',`= −${f(k)}·${dir>0?'':'(−'}${x}${dir>0?'':')'} = ${f(-k*x*dir)} %.`,'!Constant-elasticity demand: multiply the price change by the exponent.']);},
 ()=>{let a,b,c,d,D,p2;do{b=R(1,6);d=R(1,6);c=R(0,20);p2=R(5,40);D=pick([10,20,30,40,60]);a=(b+d)*p2+c-D;}while(a<=b*5+c);
  const p1=(a-c)/(b+d);
  return num(`Demand: Q = ${a} − ${co(b)}p. Supply: Q = ${c?c+' + ':''}${co(d)}p. Demand increases by ${D} units at every price. What is the new equilibrium price? (two decimals if needed)`,p2,0.01,
   `New demand: Q = ${a+D} − ${co(b)}p. ${a+D} − ${b}p = ${c?c+' + ':''}${d}p ⇒ p = ${p2} (up from ${f(p1)}).`,
   [`New demand: Q = ${a} + ${D} − ${co(b)}p = ${a+D} − ${co(b)}p.`,`Set equal to supply: ${a+D}${c?' − '+c:''} = ${b+d}p.`,`p = ${p2}. Before the shift it was ${f(p1)}.`,'!A shift of demand changes the intercept, not the slope.']);}
]);

add('u2',[
 ()=>{const k=pick([2,3,4]),px=R(1,6),py=R(1,8),y=R(4,30),m=(k*px+py)*y;
  return num(`U = min(x, ${k}y). Income is ${m}, p<sub>x</sub> = ${px}, p<sub>y</sub> = ${py}. How much y is bought?`,y,0.01,
   `At the optimum x = ${k}y. ${px}·${k}y + ${py}y = ${m} ⇒ y = ${y}.`,
   [`Perfect complements: x = ${k}y at the optimum.`,`Budget: ${px}·${k}y + ${py}y = ${m}.`,`${k*px+py}y = ${m} ⇒ y = ${y} (x = ${k*y}).`,'!min function: set the arguments equal, plug into the budget.']);},
 ()=>{const px=pick([1,2,4,5,8]),py=pick([1,2,4,5,8]),m=2*R(5,50)*pick([2,4]),x=m/(2*px),y=m/(2*py),U=Math.sqrt(x*y);
  return num(`U = x<sup>0.5</sup>y<sup>0.5</sup>. Income is ${m}, p<sub>x</sub> = ${px} and p<sub>y</sub> = ${py}. What utility does the consumer reach? (two decimals)`,U,0.006,
   `x = ${f(x)}, y = ${f(y)}. U = √(${f(x)}·${f(y)}) = ${f(U)}.`,
   ['Equal exponents: half of income on each good.',`x = ${m}/(2·${px}) = ${f(x)}, y = ${m}/(2·${py}) = ${f(y)}.`,`U = (${f(x)}·${f(y)})<sup>0.5</sup> = ${f(U)}.`,'!Find the optimal bundle first, then plug it into U.']);},
 ()=>{const px=R(1,6),py=R(1,6),m=2*px*py*R(2,20),lam=m/(2*px*py);
  return num(`U = xy. Income is ${m}, p<sub>x</sub> = ${px} and p<sub>y</sub> = ${py}. What is the Lagrange multiplier λ at the optimum (the marginal utility of income)? (two decimals if needed)`,lam,0.006,
   `x = ${m/(2*px)}, y = ${m/(2*py)}. λ = U<sub>x</sub>/p<sub>x</sub> = y/p<sub>x</sub> = ${f(lam)}.`,
   ['L = xy + λ(m − p<sub>x</sub>x − p<sub>y</sub>y). FOC: y = λp<sub>x</sub>, x = λp<sub>y</sub>.',`Optimum: x = m/(2p<sub>x</sub>) = ${m/(2*px)}, y = m/(2p<sub>y</sub>) = ${m/(2*py)}.`,`λ = y/p<sub>x</sub> = ${m/(2*py)}/${px} = ${f(lam)}.`,'!λ = marginal utility per dollar = U<sub>x</sub>/p<sub>x</sub> at the optimum.']);},
 ()=>{let a,b,px,py;do{a=R(1,4);b=R(1,4);px=R(1,6);py=R(1,6);}while(a/px===b/py);
  const m=px*py*R(4,20),by=b/py>a/px,y=by?m/py:0;
  return num(`U = ${co(a)}x + ${co(b)}y. Income is ${m}, p<sub>x</sub> = ${px}, p<sub>y</sub> = ${py}. How many units of y are bought?`,y,0.01,
   `MU/p: x gives ${f(a/px)}, y gives ${f(b/py)}. Everything goes to ${by?'y':'x'}.`,
   ['Perfect substitutes: compare MU per dollar.',`x: ${a}/${px} = ${f(a/px)}. y: ${b}/${py} = ${f(b/py)}.`,by?`y is the better deal: y = ${m}/${py} = ${y}.`:'x is the better deal, so y = 0.','!Perfect substitutes: everything on the good with the highest MU/p.']);},
 ()=>{const a=pick([0.2,0.25,0.4,0.5,0.6,0.75]),m=R(3,20)*100,px=pick([2,4,5,10]),py=pick([2,4,5,10]),ask=pick(['x','y']),x=a*m/px,y=(1-a)*m/py;
  return num(`U = x<sup>${f(a)}</sup>y<sup>${f(1-a)}</sup>. Income is ${m}, p<sub>x</sub> = ${px} and p<sub>y</sub> = ${py}. How much ${ask} is demanded? (two decimals if needed)`,ask==='x'?x:y,0.006,
   `Budget shares: ${f(a)} on x and ${f(1-a)} on y. ${ask} = ${f(ask==='x'?a*m:(1-a)*m)}/${ask==='x'?px:py} = ${f(ask==='x'?x:y)}.`,
   ['MRS = MRT gives p<sub>y</sub>y/(p<sub>x</sub>x) = (1 − a)/a: fixed budget shares.',`Share on ${ask}: ${f(ask==='x'?a:1-a)}.`,`Spending: ${f(ask==='x'?a*m:(1-a)*m)}.`,`${ask} = ${f(ask==='x'?x:y)}.`,'!Cobb-Douglas: budget share = exponent (when the exponents sum to 1).']);}
]);

add('u3',[
 ()=>{const p1=pick([1,2,4,5]),m=8*p1*R(5,25),py=pick([1,2,4]),up=Math.random()<.6,p2=up?4*p1:p1/4;
  const x0=m/(2*p1),xc=m/(2*Math.sqrt(p1*p2)),x1=m/(2*p2),se=xc-x0,ie=x1-xc,ask=pick(['SE','IE']);
  return num(`U = x<sup>0.5</sup>y<sup>0.5</sup>, income ${m}, p<sub>y</sub> = ${py}. The price of x ${up?'rises':'falls'} from ${p1} to ${f(p2)}. What is the <b>${ask==='SE'?'substitution':'income'} effect</b> on x? (minus sign for a fall)`,ask==='SE'?se:ie,0.01,
   `x goes from ${f(x0)} to ${f(x1)}. Compensated demand: ${f(xc)}. Substitution effect ${f(se)}, income effect ${f(ie)}.`,
   [`Before: x = ${m}/(2·${p1}) = ${f(x0)}. After: x = ${m}/(2·${f(p2)}) = ${f(x1)}.`,`Compensated demand (old utility, new prices): x = m/(2√(p<sub>1</sub>p<sub>2</sub>)) = ${f(xc)}. (Income needed: m·√(p<sub>2</sub>/p<sub>1</sub>) = ${f(m*Math.sqrt(p2/p1))}.)`,`Substitution effect: ${f(xc)} − ${f(x0)} = ${f(se)}.`,`Income effect: ${f(x1)} − ${f(xc)} = ${f(ie)}.`,'!Substitution effect: new prices, old utility. Income effect = total − substitution.']);},
 ()=>{const th=pick([0.1,0.2,0.25,0.3,0.4]),xi=pick([0.5,0.8,1,1.5,2,-0.5,-1]),e=pick([-0.3,-0.6,-0.8,-1,-1.2,-1.5]),es=e+th*xi;
  return num(`Slutsky: the uncompensated price elasticity is ε = ${f(e)}, the budget share is θ = ${f(th)} and the income elasticity is ξ = ${f(xi)}. What is the compensated elasticity ε*? (two decimals)`,es,0.006,
   `ε* = ε + θξ = ${f(e)} + ${f(th)}·${f(xi)} = ${f(es)}.`,
   ['Slutsky: ε = ε* − θξ, so ε* = ε + θξ.',`θξ = ${f(th)}·${f(xi)} = ${f(th*xi)}.`,`ε* = ${f(e)} + ${f(th*xi)} = ${f(es)}.`,'!Compensated = total + budget share × income elasticity.']);},
 ()=>{const a=pick([0.5,1,2]),Y=pick([60,120,180,240]),p2=pick([1,2,3]),pA=pick([1,2]),pB=pA*pick([2,3,4]),s=a/(a+1),q1=s*Y/pB;
  return num(`U = q<sub>1</sub><sup>${a}</sup>q<sub>2</sub>, income ${Y}, p<sub>2</sub> = ${p2}. The price of good 1 rises from ${pA} to ${pB}. How much of good 1 is bought after the price increase? (two decimals if needed)`,q1,0.006,
   `Share of income on good 1: ${a}/(${a} + 1) = ${f(s)}. q<sub>1</sub> = ${f(s*Y)}/${pB} = ${f(q1)} (before: ${f(s*Y/pA)}).`,
   [`Budget share of good 1 = ${a}/(${a} + 1) = ${f(s)}, independent of prices.`,`Spending on good 1: ${f(s*Y)}.`,`Before: ${f(s*Y)}/${pA} = ${f(s*Y/pA)}. After: ${f(s*Y)}/${pB} = ${f(q1)}.`,`q<sub>2</sub> = ${f((1-s)*Y/p2)} both before and after: the PCC is horizontal.`,'!Cobb-Douglas: spending on each good is fixed.']);},
 ()=>{const k=pick([0.005,0.01,0.02,0.05]),c=R(2,40),Y=R(4,20)*100,Q=c+k*Y,e=k*Y/Q;
  return num(`Engel curve: Q = ${c} + ${k}Y. What is the income elasticity at Y = ${Y}? (two decimals)`,e,0.006,
   `Q = ${f(Q)}. ξ = ${k}·${Y}/${f(Q)} = ${f(e)}.`,
   ['ξ = (dQ/dY)·(Y/Q).',`dQ/dY = ${k}, Q = ${c} + ${f(k*Y)} = ${f(Q)}.`,`ξ = ${f(k*Y)}/${f(Q)} = ${f(e)}.`,'Between 0 and 1: a normal good and a necessity.','!Positive intercept ⇒ income elasticity below 1.']);}
]);

add('u4',[
 ()=>{const b=R(1,5),p=R(5,30),Q=b*R(5,30),a=Q+b*p,cs=Q*Q/(2*b);
  return num(`Demand: Q = ${a} − ${co(b)}p. The price is ${p}. What is consumer surplus? (two decimals if needed)`,cs,0.06,
   `Q = ${Q}, choke price ${f(a/b)}. CS = ½·${Q}·(${f(a/b)} − ${p}) = ${f(cs)}.`,
   [`Quantity: Q = ${a} − ${b*p} = ${Q}.`,`Choke price (Q = 0): p = ${a}/${b} = ${f(a/b)}.`,`CS = ½·${Q}·${f(a/b-p)} = ${f(cs)}.`,'!Q as a function of p: find the choke price by setting Q = 0.']);},
 ()=>{const al=pick([0.5,0.75]),w=R(5,40)*2,j=R(1,6),V=al===0.5?2*w*j:4*w*j,H=al===0.5?12-j:18-j;
  return num(`U = Y<sup>${al}</sup>N<sup>${1-al}</sup>, where N = 24 − H is leisure and Y = wH + V is income. The wage is w = ${w} and unearned income is V = ${V}. How many hours H are worked?`,H,0.01,
   `Full income: 24·${w} + ${V} = ${24*w+V}. Leisure gets ${1-al} of it: N = ${1-al}·${24*w+V}/${w} = ${24-H}. H = ${H}.`,
   ['Think of leisure as a good with price w. Full income = 24w + V.',`Cobb-Douglas: spending on leisure = ${1-al} × full income = ${f((1-al)*(24*w+V))}.`,`N = ${f((1-al)*(24*w+V))}/${w} = ${24-H}.`,`H = 24 − ${24-H} = ${H}. (Without V it would be ${24*al}.)`,'!More unearned income ⇒ more leisure when leisure is normal.']);},
 ()=>{const c=pick([1,3]),H=R(1,12),w=4*c*c*H;
  return num(`U = Y<sup>0.5</sup> + ${co(c)}N, where Y = wH, N = 24 − H and w = ${w}. How many hours H are worked?`,H,0.01,
   `U = √(${w}H) + ${c===1?'':c}(24 − H). dU/dH = √${w}/(2√H) − ${c} = 0 ⇒ H = ${H}.`,
   [`Write U in terms of H: U = (${w}H)<sup>0.5</sup> + ${c===1?'':c}(24 − H).`,`dU/dH = 0.5·${w}<sup>0.5</sup>H<sup>−0.5</sup> − ${c}.`,`Set to 0: √H = √${w}/(2·${c}) = ${f(Math.sqrt(H))} ⇒ H = ${H}.`,'!Plug the budget into U and maximize over hours.']);}
]);

add('u5',[
 ()=>{const a=R(10,40),b=R(1,3),L=R(1,Math.floor(a/b)-1),q=a*L-b*L*L;
  return num(`Short-run production: q = ${a}L − ${co(b)}L<sup>2</sup>. What is the average product of labor at L = ${L}?`,q/L,0.01,
   `q = ${q}. AP<sub>L</sub> = ${q}/${L} = ${f(q/L)}.`,
   [`q(${L}) = ${a*L} − ${b*L*L} = ${q}.`,`AP<sub>L</sub> = q/L = ${f(q/L)}.`,`(MP<sub>L</sub> = ${a} − ${2*b}L = ${a-2*b*L}.)`,'!AP = q/L. MP = dq/dL.']);},
 ()=>{const b=R(1,4),L=R(3,20),a=2*b*L;
  return num(`Short-run production: q = ${a}L − ${co(b)}L<sup>2</sup>. At what L is output largest?`,L,0.01,
   `MP<sub>L</sub> = ${a} − ${2*b}L = 0 ⇒ L = ${L}.`,
   [`MP<sub>L</sub> = dq/dL = ${a} − ${2*b}L.`,'Output peaks where the marginal product is zero.',`L = ${a}/${2*b} = ${L}.`,'!Max output: MP = 0.']);},
 ()=>{const A=pick([2,4,5,10,20]),L=pick([1,4,9,16,25]),k=R(1,5),K=L*k*k,mp=0.5*A*k;
  return num(`q = ${A}K<sup>0.5</sup>L<sup>0.5</sup> with K = ${K} and L = ${L}. What is the marginal product of labor? (two decimals if needed)`,mp,0.006,
   `MP<sub>L</sub> = ${f(0.5*A)}·(K/L)<sup>0.5</sup> = ${f(0.5*A)}·${k} = ${f(mp)}.`,
   [`MP<sub>L</sub> = ∂q/∂L = ${f(0.5*A)}K<sup>0.5</sup>L<sup>−0.5</sup>.`,`= ${f(0.5*A)}·(K/L)<sup>0.5</sup> = ${f(0.5*A)}·(${K}/${L})<sup>0.5</sup>.`,`= ${f(0.5*A)}·${k} = ${f(mp)}.`,'!Cobb-Douglas: MP<sub>L</sub> = (exponent of L)·q/L.']);},
 ()=>{const b=R(1,3),L=R(2,15),a=2*b*L;
  return num(`Short-run production: q = ${a}L<sup>2</sup> − ${co(b)}L<sup>3</sup>. At what L is the average product of labor largest?`,L,0.01,
   `AP = ${a}L − ${b}L<sup>2</sup>, maximized at L = ${a}/${2*b} = ${L}, where MP = AP.`,
   [`AP<sub>L</sub> = q/L = ${a}L − ${b}L<sup>2</sup>.`,`dAP/dL = ${a} − ${2*b}L = 0 ⇒ L = ${L}.`,`Check: MP = ${2*a}L − ${3*b}L<sup>2</sup> = ${2*a*L-3*b*L*L} = AP = ${a*L-b*L*L}.`,'!AP is largest where MP = AP.']);},
 ()=>{const a=pick([50,100,200]),K=R(1,20),L=R(5,100);
  return num(`f(K, L) = ${a}KL + ${a}L. How much is produced with K = ${K} and L = ${L}?`,a*K*L+a*L,0.5,
   `q = ${a}·${K}·${L} + ${a}·${L} = ${a*K*L+a*L}.`,
   [`${a}KL = ${a*K*L}.`,`${a}L = ${a*L}.`,`q = ${a*K*L+a*L}. Note: q = ${a}L(K + 1), so with L = 0 nothing is produced.`,'!Take it term by term.']);}
]);

add('u6',[
 ()=>{const F=R(1,20)*10,b=R(0,20),c=pick([0.5,1,2,3]),q=R(2,30),mc=b+2*c*q;
  return num(`C(q) = ${F} + ${b?b+'q + ':''}${co(c)}q<sup>2</sup>. What is marginal cost at q = ${q}?`,mc,0.01,
   `MC = ${b?b+' + ':''}${f(2*c)}q = ${f(mc)}.`,
   [`MC = dC/dq = ${b?b+' + ':''}${f(2*c)}q.`,`At q = ${q}: ${f(mc)}.`,`The fixed cost ${F} does not affect MC.`,'!Fixed costs disappear when you differentiate.']);},
 ()=>{const c=pick([1,2,4,0.5]),q=R(2,20)*(c===0.5?2:1),F=c*q*q,ac=2*Math.sqrt(F*c);
  return num(`C(q) = ${F} + ${co(c)}q<sup>2</sup>. What is the minimum average cost?`,ac,0.01,
   `AC = ${F}/q + ${co(c)}q, minimized at q = ${q} where AC = ${f(ac)}.`,
   [`AC = ${F}/q + ${co(c)}q.`,`dAC/dq = −${F}/q<sup>2</sup> + ${c} = 0 ⇒ q = ${q}.`,`AC(${q}) = ${f(F/q)} + ${f(c*q)} = ${f(ac)}. (MC = ${f(2*c*q)} = AC.)`,'!Min AC is where MC = AC.']);},
 ()=>{const cc=pick([0.5,1]),q=R(2,10),b=2*cc*q,a=b*b/(4*cc)+R(2,30),F=R(5,50)*10,v=a-b*b/(4*cc);
  return num(`C(q) = ${F} + ${a}q − ${b}q<sup>2</sup> + ${co(cc)}q<sup>3</sup>. What is the lowest average variable cost? (two decimals if needed)`,v,0.01,
   `AVC = ${a} − ${b}q + ${co(cc)}q<sup>2</sup>, minimized at q = ${q}: AVC = ${f(v)}.`,
   [`AVC = VC/q = ${a} − ${b}q + ${co(cc)}q<sup>2</sup>.`,`dAVC/dq = −${b} + ${f(2*cc)}q = 0 ⇒ q = ${q}.`,`AVC(${q}) = ${a} − ${b*q} + ${f(cc*q*q)} = ${f(v)}.`,'!This is the shutdown price for a competitive firm.']);},
 ()=>{const pr=pick([[1,4],[4,1],[2,8],[9,1],[1,9],[4,9],[16,1],[2,2]]),w=pr[0],r=pr[1],q=R(5,60),C=2*q*Math.sqrt(w*r);
  return num(`Long run: q = K<sup>0.5</sup>L<sup>0.5</sup>, w = ${w} and r = ${r}. What is the lowest cost of producing q = ${q}? (two decimals if needed)`,C,0.01,
   `Tangency: K/L = w/r = ${f(w/r)}. L = ${f(q*Math.sqrt(r/w))}, K = ${f(q*Math.sqrt(w/r))}. C = ${f(C)}.`,
   [`MRTS = −K/L = −w/r ⇒ K = ${f(w/r)}L.`,`q = (KL)<sup>0.5</sup> = L·${f(Math.sqrt(w/r))} ⇒ L = ${f(q*Math.sqrt(r/w))}, K = ${f(q*Math.sqrt(w/r))}.`,`C = ${w}·${f(q*Math.sqrt(r/w))} + ${r}·${f(q*Math.sqrt(w/r))} = ${f(C)}.`,'!Shortcut for K<sup>0.5</sup>L<sup>0.5</sup>: C = 2q√(wr).']);},
 ()=>{const a=pick([1,2,3]),b=pick([1,2,4]),w=R(2,20),r=R(2,20),q=a*b*R(2,20),C=q*(w/a+r/b);
  return num(`Long run: q = min(${co(a)}L, ${co(b)}K), w = ${w} and r = ${r}. What does it cost to produce q = ${q}?`,C,0.01,
   `L = ${q/a}, K = ${q/b}. C = ${w}·${q/a} + ${r}·${q/b} = ${f(C)}.`,
   [`No waste: ${co(a)}L = ${co(b)}K = q.`,`L = ${q}/${a} = ${q/a}, K = ${q}/${b} = ${q/b}.`,`C = ${w*q/a} + ${r*q/b} = ${f(C)}.`,'!Fixed proportions: C = (w/a + r/b)·q.']);}
]);

add('u7',[
 ()=>{const cc=pick([0.5,1]),q=R(2,10),b=2*cc*q,a=b*b/(4*cc)+R(2,30),F=R(5,50)*10,v=a-b*b/(4*cc);
  return num(`A competitive firm has C(q) = ${F} + ${a}q − ${b}q<sup>2</sup> + ${co(cc)}q<sup>3</sup>. Below what price does it shut down in the short run? (two decimals if needed)`,v,0.01,
   `Shutdown price = min AVC. AVC = ${a} − ${b}q + ${co(cc)}q<sup>2</sup> is lowest at q = ${q}: ${f(v)}.`,
   [`AVC = ${a} − ${b}q + ${co(cc)}q<sup>2</sup> (the fixed cost ${F} is ignored).`,`dAVC/dq = 0 ⇒ q = ${q}.`,`min AVC = ${f(v)}. Below this price the firm shuts down.`,'!Short run: shut down if p &lt; min AVC.']);},
 ()=>{const c=pick([0.5,1,2]),p=2*R(5,40),F=R(1,40)*10,q=p/(2*c),pi=p*q-F-c*q*q;
  return num(`A price-taking firm has C(q) = ${F} + ${co(c)}q<sup>2</sup> and the price is ${p}. What is its profit? (minus sign for a loss)`,pi,0.5,
   `p = MC = ${f(2*c)}q ⇒ q = ${f(q)}. π = ${p}·${f(q)} − ${F} − ${f(c*q*q)} = ${f(pi)}.`,
   [`MC = ${f(2*c)}q. Set p = MC: q = ${f(q)}.`,`Revenue: ${f(p*q)}. Cost: ${F} + ${f(c*q*q)} = ${f(F+c*q*q)}.`,`π = ${f(pi)}.`,pi<0?'A loss, but p ≥ min AVC = 0, so the firm keeps producing in the short run.':'Positive profit attracts entry in the long run.','!Price taker: p = MC, then π = pq − C(q).']);},
 ()=>{const c=pick([1,2,4]),qs=R(2,12),F=c*qs*qs,p=2*c*qs,B=R(1,10),n=R(5,40),Q=n*qs,A=Q+B*p;
  return num(`All firms in a competitive industry have C(q) = ${F} + ${co(c)}q<sup>2</sup>. Market demand is Q = ${A} − ${co(B)}p. How many firms are there in the long-run equilibrium?`,n,0.01,
   `Min AC at q = ${qs}, p = ${p}. Q = ${A} − ${B*p} = ${Q}. n = ${Q}/${qs} = ${n}.`,
   [`AC = ${F}/q + ${co(c)}q, minimized at q = ${qs}: min AC = ${p}.`,`Long-run price: p = ${p}. Demand: Q = ${A} − ${B}·${p} = ${Q}.`,`Each firm produces ${qs}: n = ${Q}/${qs} = ${n}.`,'!Long run: p = min AC; n = Q / (output per firm).']);},
 ()=>{const c=pick([1,2]),t=R(1,10),b=R(0,20),q=R(3,30),p=b+t+2*c*q,F=R(1,20)*10;
  return num(`A price-taking firm has C(q) = ${F} + ${b?b+'q + ':''}${co(c)}q<sup>2</sup>. The price is ${p} and a specific tax of ${t} per unit is introduced. How much does it produce?`,q,0.01,
   `p = MC + t: ${p} = ${b?b+' + ':''}${2*c}q + ${t} ⇒ q = ${q}.`,
   [`The tax raises MC by ${t}: MC + t = ${b?b+' + ':''}${2*c}q + ${t}.`,`Set equal to p: ${p} = ${b+t} + ${2*c}q.`,`q = ${q}.`,'!A specific tax shifts MC up by t.']);}
]);

add('u8',[
 ()=>{const b=R(1,4),d=R(1,6),p=R(5,30),Q=d*p,a=Q+b*p,ask=pick(['CS','PS']),cs=Q*Q/(2*b),ps=Q*p/2;
  return num(`Demand: Q = ${a} − ${co(b)}p. Supply: Q = ${co(d)}p. What is ${ask==='CS'?'consumer':'producer'} surplus in equilibrium? (two decimals if needed)`,ask==='CS'?cs:ps,0.06,
   `Equilibrium: p = ${p}, Q = ${Q}. ${ask==='CS'?`CS = ½·${Q}·(${f(a/b)} − ${p}) = ${f(cs)}`:`PS = ½·${Q}·${p} = ${f(ps)}`}.`,
   [`${a} − ${b}p = ${d}p ⇒ p = ${p}, Q = ${Q}.`,ask==='CS'?`Choke price: ${a}/${b} = ${f(a/b)}.`:'Supply passes through the origin, so PS is a triangle from p = 0 up to the price.',ask==='CS'?`CS = ½·${Q}·${f(a/b-p)} = ${f(cs)}.`:`PS = ½·${Q}·${p} = ${f(ps)}.`,'!CS: above the price, below demand. PS: below the price, above supply.']);},
 ()=>{const t=2*R(1,10),a=2*R(30,100),Q=(a-t)/2,rev=t*Q;
  return num(`Demand: Q = ${a} − p. Supply: Q = p. A tax of ${t} per unit is introduced. How much tax revenue does the government collect?`,rev,0.5,
   `${a} − p<sub>b</sub> = p<sub>b</sub> − ${t} ⇒ Q = ${Q}. Revenue = ${t}·${Q} = ${rev}.`,
   [`Sellers receive p<sub>b</sub> − ${t}.`,`${a} − p<sub>b</sub> = p<sub>b</sub> − ${t} ⇒ p<sub>b</sub> = ${(a+t)/2}, Q = ${Q}.`,`Revenue = t·Q = ${t}·${Q} = ${rev}.`,'!Tax revenue = tax × new quantity.']);},
 ()=>{const e=R(10,60),k=R(2,Math.floor(e/2)),a=2*e,fl=e+k;
  return num(`Demand: Q = ${a} − p. Supply: Q = p. A price floor of ${fl} is introduced (only the quantity demanded is produced). What is the deadweight loss?`,k*k,0.5,
   `Equilibrium p = Q = ${e}. At ${fl}: Q = ${e-k}. DWL = ½·(${fl} − ${e-k})·(${e} − ${e-k}) = ${k*k}.`,
   [`Equilibrium: p = ${e}, Q = ${e}.`,`At the floor: Q<sub>d</sub> = ${a} − ${fl} = ${e-k}.`,`At Q = ${e-k}: willingness to pay ${fl}, marginal cost ${e-k}. Gap ${2*k}.`,`DWL = ½·${2*k}·${k} = ${k*k}.`,'!DWL = ½ × price gap × lost quantity.']);},
 ()=>{let b,d,s,pb,a;do{b=R(1,4);d=R(1,4);s=R(2,12);pb=R(5,40);a=b*pb+d*(pb+s);}while(a>600);
  const Q=a-b*pb;
  return num(`Demand: Q = ${a} − ${co(b)}p. Supply: Q = ${co(d)}p. Producers get a subsidy of ${s} per unit. What is the new quantity?`,Q,0.01,
   `Sellers get p<sub>b</sub> + ${s}: ${a} − ${b}p<sub>b</sub> = ${d}(p<sub>b</sub> + ${s}) ⇒ p<sub>b</sub> = ${pb}, Q = ${Q}.`,
   [`Producer price = consumer price + ${s}.`,`${a} − ${b}p<sub>b</sub> = ${d}p<sub>b</sub> + ${d*s} ⇒ ${a-d*s} = ${b+d}p<sub>b</sub>.`,`p<sub>b</sub> = ${pb}, Q = ${Q}.`,'!A subsidy is a negative tax: quantity rises above the efficient level.']);},
 ()=>{const pw=R(5,30),t=R(2,10),a=2*(pw+t)+2*R(5,40),imp=a-2*(pw+t),ask=pick(['imp','rev']);
  return num(`Domestic demand: Q = ${a} − p. Domestic supply: Q = p. The world price is ${pw} and the country imports freely at that price. A tariff of ${t} per unit is introduced. ${ask==='imp'?'How much is imported with the tariff?':'How much tariff revenue does the government collect?'}`,ask==='imp'?imp:t*imp,0.5,
   `Domestic price: ${pw+t}. Demand ${a-pw-t}, domestic supply ${pw+t}. Imports: ${imp}${ask==='rev'?`. Revenue: ${t}·${imp} = ${t*imp}`:''}.`,
   [`With the tariff the domestic price is ${pw} + ${t} = ${pw+t}.`,`Quantity demanded: ${a} − ${pw+t} = ${a-pw-t}. Domestic supply: ${pw+t}.`,`Imports: ${a-pw-t} − ${pw+t} = ${imp} (before: ${a-2*pw}).`,ask==='rev'?`Revenue = ${t}·${imp} = ${t*imp}. A quota with the same imports gives this amount to license holders instead.`:'A quota of the same size would give the same price, but no government revenue.','!Imports = demand − domestic supply at the domestic price.']);}
]);

add('u9',[
 ()=>{const al=pick([0.25,0.5,0.75]),b=pick([0.25,0.5,0.75]),X=R(2,20)*4,Y=R(2,20)*4,ask=pick(['y','pr']),yA=b*Y,pr=b*Y/((1-al)*X);
  return num(`Exchange economy. A has U = x<sup>${al}</sup>y<sup>${1-al}</sup> and owns ${X} units of x (no y). B has U = x<sup>${b}</sup>y<sup>${1-b}</sup> and owns ${Y} units of y (no x). ${ask==='y'?'How much y does A consume in the competitive equilibrium?':'What is the equilibrium price ratio p<sub>x</sub>/p<sub>y</sub>? (two decimals)'}`,ask==='y'?yA:pr,0.006,
   `Market for x: A keeps ${al}·${X}, B buys ${b}·p<sub>y</sub>${Y}/p<sub>x</sub>. Clearing gives p<sub>x</sub>/p<sub>y</sub> = ${f(pr)}, and A’s y = ${f(yA)}.`,
   [`A’s income: p<sub>x</sub>·${X}. She spends ${al} on x and ${1-al} on y. B’s income: p<sub>y</sub>·${Y}, ${b} spent on x.`,`Market for x: ${al}·${X} + ${b}·${Y}·p<sub>y</sub>/p<sub>x</sub> = ${X}.`,`⇒ p<sub>x</sub>/p<sub>y</sub> = ${b}·${Y}/(${1-al}·${X}) = ${f(pr)}.`,`A’s y = ${1-al}·${X}·p<sub>x</sub>/p<sub>y</sub> = ${f(yA)}.`,'!Income = value of the endowment. Clear one market, and the other clears too (Walras).']);},
 ()=>{const X=R(2,10)*10,Y=pick([0.5,2,3,4])*X,x=R(1,X/10-1)*10/2+R(1,4),y=x*Y/X;
  return num(`In an Edgeworth box both consumers have U = xy. There are ${X} units of x and ${Y} units of y in total. On the contract curve, how much y does A have if x<sub>A</sub> = ${x}? (two decimals if needed)`,y,0.006,
   `Equal MRS: y<sub>A</sub>/x<sub>A</sub> = (${Y} − y<sub>A</sub>)/(${X} − x<sub>A</sub>) ⇒ y<sub>A</sub> = (${Y}/${X})x<sub>A</sub> = ${f(y)}.`,
   ['MRS for U = xy: −y/x.',`Equal MRS: y<sub>A</sub>/x<sub>A</sub> = (${Y} − y<sub>A</sub>)/(${X} − x<sub>A</sub>).`,`Solution: y<sub>A</sub> = ${f(Y/X)}·x<sub>A</sub> (the diagonal of the box).`,`y<sub>A</sub> = ${f(Y/X)}·${x} = ${f(y)}.`,'!Identical Cobb-Douglas preferences: the contract curve is the diagonal.']);}
]);

add('u10',[
 ()=>{const b=pick([0.5,1,2,4]),c=R(2,40),Q=R(5,60),a=c+2*b*Q,p=a-b*Q,ask=pick(['Q','p']);
  return num(`Monopoly: inverse demand p = ${f(a)} − ${co(b)}Q and constant MC = ${c}. ${ask==='Q'?'What is the profit-maximizing quantity?':'What price does the monopoly charge?'}`,ask==='Q'?Q:p,0.01,
   `MR = ${f(a)} − ${f(2*b)}Q = ${c} ⇒ Q = ${Q}, p = ${f(p)}.`,
   [`MR = ${f(a)} − ${f(2*b)}Q (twice the slope of demand).`,`MR = MC: ${f(a)} − ${f(2*b)}Q = ${c} ⇒ Q = ${Q}.`,`p = ${f(a)} − ${f(b*Q)} = ${f(p)}.`,'!Linear demand, constant MC: p = (a + MC)/2.']);},
 ()=>{const c=R(2,40),Q=R(5,60),a=c+2*Q,p=a-Q,L=(p-c)/p;
  return num(`Monopoly: p = ${a} − Q and MC = ${c}. What is the Lerner index at the optimum? (two decimals)`,L,0.006,
   `Q = ${Q}, p = ${p}. L = (${p} − ${c})/${p} = ${f(L)}.`,
   [`MR = ${a} − 2Q = ${c} ⇒ Q = ${Q}, p = ${p}.`,`L = (p − MC)/p = ${p-c}/${p}.`,`= ${f(L)}.`,'!Lerner index = markup as a share of the price.']);},
 ()=>{const c=R(2,40),Q=R(5,60),a=c+2*Q,p=a-Q,cs=Q*Q/2;
  return num(`Monopoly: p = ${a} − Q and MC = ${c}. What is consumer surplus at the monopoly outcome?`,cs,0.5,
   `Q = ${Q}, p = ${p}. CS = ½·${Q}·(${a} − ${p}) = ${f(cs)}.`,
   [`MR = MC: ${a} − 2Q = ${c} ⇒ Q = ${Q}, p = ${p}.`,`Choke price: ${a}.`,`CS = ½·${Q}·${a-p} = ${f(cs)}.`,'!Under competition CS would be ½·'+(2*Q)+'·'+(2*Q)+' = '+f(2*Q*Q)+'.']);}
]);

add('u11',[
 ()=>{let a,b,c,d;do{a=R(1,9);b=R(0,6);c=R(0,6);d=R(1,9);}while(!(a>c&&d>b));
  const q=(d-b)/((a-c)+(d-b));
  return num(`Row’s payoffs: Up gives ${a} against Left and ${b} against Right. Down gives ${c} against Left and ${d} against Right. In the mixed-strategy equilibrium, with what probability does Column play Left? (two decimals)`,q,0.006,
   `Row must be indifferent: ${a}q + ${b}(1 − q) = ${c}q + ${d}(1 − q) ⇒ q = ${d-b}/${(a-c)+(d-b)} = ${f(q)}.`,
   ['Column mixes so that Row is indifferent between Up and Down.',`Up: ${a}q + ${b}(1 − q). Down: ${c}q + ${d}(1 − q).`,`Set equal: ${a-c}q = ${d-b}(1 − q) ⇒ q = ${d-b}/${(a-c)+(d-b)}.`,`q = ${f(q)}.`,'!A player’s mixing probability comes from the <b>other</b> player’s payoffs.']);}
]);

add('u12',[
 ()=>{const c=R(2,40),k=R(3,30),a=c+3*k,ask=pick(['q','pi']);
  return num(`Cournot duopoly: p = ${a} − Q, both firms have MC = ${c}. ${ask==='q'?'How much does each firm produce?':'What is each firm’s profit?'}`,ask==='q'?k:k*k,0.5,
   `q = (${a} − ${c})/3 = ${k}. p = ${a-2*k}. π = (${a-2*k} − ${c})·${k} = ${k*k}.`,
   [`Best response: q<sub>1</sub> = (${a-c} − q<sub>2</sub>)/2.`,`Symmetric: q = (${a} − ${c})/3 = ${k}.`,`p = ${a} − ${2*k} = ${a-2*k}.`,`π = (p − MC)·q = ${k}·${k} = ${k*k}.`,'!Two identical Cournot firms: q = (a − c)/(3b).']);},
 ()=>{const c=R(2,40),k=2*R(2,20),a=c+2*k,pi=k*k/2;
  return num(`p = ${a} − Q and MC = ${c} for both firms. They form a cartel and split the monopoly output equally. What is each firm’s profit?`,pi,0.5,
   `Monopoly: Q = ${k}, p = ${a-k}. Each sells ${k/2} and earns (${a-k} − ${c})·${k/2} = ${f(pi)}.`,
   [`Cartel = monopoly: MR = ${a} − 2Q = ${c} ⇒ Q = ${k}.`,`p = ${a} − ${k} = ${a-k}.`,`Each firm: ${k/2} units, π = ${k}·${k/2} = ${f(pi)}.`,`Compare Cournot: ${f((2*k/3)**2)} each, less than the cartel.`,'!Cartel profit is higher, but each firm gains by cheating.']);},
 ()=>{const c=R(2,40),k=4*R(2,15),a=c+k;
  return num(`Stackelberg: p = ${a} − Q and MC = ${c} for both. How much does the <b>follower</b> produce?`,k/4,0.01,
   `Leader: (${a} − ${c})/2 = ${k/2}. Follower: (${k} − ${k/2})/2 = ${k/4}.`,
   [`Follower’s best response: q<sub>F</sub> = (${k} − q<sub>L</sub>)/2.`,`Leader plugs it in and gets q<sub>L</sub> = ${k}/2 = ${k/2}.`,`Follower: (${k} − ${k/2})/2 = ${k/4}.`,'!Linear demand: the follower produces half of the leader.']);},
 ()=>{const c1=R(5,30),c2=c1+R(1,10);
  return num(`Bertrand duopoly with a homogeneous good. Firm 1 has MC = ${c1}, firm 2 has MC = ${c2}. Approximately what price is charged in equilibrium?`,c2,0.01,
   `Firm 2 cannot go below ${c2}. Firm 1 undercuts to just below ${c2} and serves the whole market.`,
   [`Firm 2 will not price below its MC of ${c2}.`,`Firm 1 can charge just under ${c2} and win all customers.`,`Price ≈ ${c2}. Firm 1 earns about ${c2-c1} per unit.`,'!Bertrand with different costs: price ≈ the higher MC.']);},
 ()=>{const n=R(2,9),c=R(2,30),k=R(2,15),a=c+(n+1)*k,Q=n*k;
  return num(`Cournot with ${n} identical firms: p = ${a} − Q and MC = ${c}. What is total market output?`,Q,0.01,
   `Each firm: (${a} − ${c})/(${n} + 1) = ${k}. Q = ${n}·${k} = ${Q}.`,
   [`n identical Cournot firms: q<sub>i</sub> = (a − c)/((n + 1)b).`,`q<sub>i</sub> = ${a-c}/${n+1} = ${k}.`,`Q = ${Q}, p = ${a-Q}.`,'!More firms ⇒ output closer to the competitive level.']);}
]);
})();
