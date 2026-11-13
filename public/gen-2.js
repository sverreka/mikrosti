// Generators modeled on the fall 2024 exam, Problem 3: n competitive firms with C = F + q², linear demand,
// welfare, and the same market served by a monopolist. New numbers every time.
(function(){
if(typeof GEN==='undefined') return;
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const f=x=>{const r=Math.round(x*100)/100;return (r<0?'−':'')+Math.abs(r).toLocaleString('en-US',{maximumFractionDigits:2});};
const num=(q,a,tol,e,st)=>({t:'num',q,a,tol,e,st});
function market(){ // n firms, C = F + q², demand Q = A − p, equilibrium p = 2A/(n + 2)
  const n=pick([4,6,8,10,12,16,20]),p=2*R(10,60),F=pick([10,20,25,40,50,100]),A=p*(n+2)/2,q=p/2,Q=n*q;
  return {n,p,F,A,q,Q,txt:`A competitive market has ${n} price-taking firms, each with cost function C(q) = ${F} + q<sup>2</sup>. Market demand is Q<sub>d</sub>(p) = ${A} − p.`};
}
const add=(u,fns)=>{ GEN[u]=GEN[u]||[]; GEN[u].push(...fns); };

add('u7',[
 ()=>{const m=market();
  return num(`${m.txt} What is the equilibrium price?`,m.p,0.01,`q<sub>i</sub> = p/2, so Q<sub>s</sub> = ${m.n}p/2 = ${m.n/2}p. ${m.n/2}p = ${m.A} − p gives p = ${m.p}.`,
   ['Each firm: p = MC = 2q ⇒ q<sub>i</sub>(p) = p/2 (min AVC = 0, so it supplies at any positive price).',`Market supply: Q<sub>s</sub> = ${m.n}·p/2 = ${m.n/2}p.`,`Set equal to demand: ${m.n/2}p = ${m.A} − p ⇒ ${m.n/2+1}p = ${m.A}.`,`p = ${m.p}, Q = ${m.Q}.`,'!Firm supply from MC → add up over firms → equilibrium.']);},
 ()=>{const m=market();
  return num(`${m.txt} The equilibrium price is ${m.p}. What is the total market quantity?`,m.Q,0.01,`Each firm: ${m.p} = 2q ⇒ q = ${f(m.q)}. Q = ${m.n}·${f(m.q)} = ${f(m.Q)}.`,
   [`p = MC: ${m.p} = 2q ⇒ q = ${f(m.q)}.`,`Q = ${m.n}·${f(m.q)} = ${f(m.Q)}.`,`Check with demand: ${m.A} − ${m.p} = ${f(m.Q)}.`,'!Market quantity = number of firms × output per firm.']);},
 ()=>{const m=market(),pi=m.p*m.q-m.F-m.q*m.q;
  return num(`${m.txt} The equilibrium price is ${m.p}. What is each firm’s profit?`,pi,0.5,`q = ${f(m.q)}. π = ${m.p}·${f(m.q)} − ${m.F} − ${f(m.q)}<sup>2</sup> = ${f(pi)}.`,
   [`Output: ${m.p} = 2q ⇒ q = ${f(m.q)}.`,`Revenue: ${m.p}·${f(m.q)} = ${f(m.p*m.q)}.`,`Cost: ${m.F} + ${f(m.q*m.q)} = ${f(m.F+m.q*m.q)}.`,`π = ${f(pi)}.`,'!π = pq − F − q<sup>2</sup>.']);}
]);

add('u8',[
 ()=>{const m=market(),cs=0.5*m.Q*(m.A-m.p);
  return num(`${m.txt} In equilibrium p = ${m.p} and Q = ${m.Q}. What is consumer surplus?`,cs,0.5,`CS = ½·${m.Q}·(${m.A} − ${m.p}) = ${f(cs)}.`,
   [`Inverse demand: p = ${m.A} − Q, choke price ${m.A}.`,'CS = triangle between demand and the price.',`CS = ½·${m.Q}·${m.A-m.p} = ${f(cs)}.`,'!CS = ½ × Q × (choke price − p).']);},
 ()=>{const m=market(),cs=0.5*m.Q*(m.A-m.p),ps=0.5*m.Q*m.p,w=cs+ps;
  return num(`${m.txt} In equilibrium p = ${m.p} and Q = ${m.Q}. What is welfare W = CS + PS?`,w,0.5,`CS = ${f(cs)}. Supply starts at the origin, so PS = ½·${m.Q}·${m.p} = ${f(ps)}. W = ${f(w)}.`,
   [`CS = ½·${m.Q}·(${m.A} − ${m.p}) = ${f(cs)}.`,`Inverse market supply: p = ${f(2/m.n)}Q, through the origin.`,`PS = ½·${m.Q}·${m.p} = ${f(ps)}.`,`W = ${f(cs)} + ${f(ps)} = ${f(w)}.`,'!PS = area between the price and the supply curve.']);}
]);

add('u10',[
 ()=>{const A=24*R(2,20),F=pick([10,20,50,100]),Q=A/4,p=3*A/4,pi=A*A/8-F,ask=pick(['Q','p','pi']);
  const q=`A monopolist has cost function C(Q) = ${F} + Q<sup>2</sup> and faces demand Q<sub>d</sub>(p) = ${A} − p. `;
  const st=[`Profit: π = (${A} − Q)Q − ${F} − Q<sup>2</sup>.`,`First-order condition: ${A} − 2Q − 2Q = 0 ⇒ Q* = ${Q}.`,`Price from demand: p* = ${A} − ${Q} = ${p}.`,`π* = ${p}·${Q} − ${F} − ${Q}<sup>2</sup> = ${f(pi)}.`,'!MR = MC gives Q. The price comes from the demand curve.'];
  if(ask==='Q') return num(q+'What is the optimal quantity Q*?',Q,0.01,`MR = ${A} − 2Q = MC = 2Q ⇒ Q* = ${Q}.`,st);
  if(ask==='p') return num(q+'What price p* does the monopolist charge?',p,0.01,`Q* = ${Q}, so p* = ${A} − ${Q} = ${p}.`,st);
  return num(q+'What is the monopolist’s profit π(Q*)?',pi,0.5,`Q* = ${Q}, p* = ${p}. π = ${f(pi)}.`,st);},
 ()=>{const A=24*R(2,20),Qm=A/4,pm=3*A/4,Qe=A/3,dwl=A*A/96;
  return num(`A monopolist has cost function C(Q) = 20 + Q<sup>2</sup> and faces demand Q<sub>d</sub>(p) = ${A} − p. What is the deadweight loss compared with the efficient quantity, where p = MC?`,dwl,0.5,
   `Monopoly: Q = ${Qm}, p = ${pm}, MC(Q<sub>m</sub>) = ${2*Qm}. Efficient: ${A} − Q = 2Q ⇒ Q = ${f(Qe)}. DWL = ½·(${pm} − ${2*Qm})·(${f(Qe)} − ${Qm}) = ${f(dwl)}.`,
   [`Monopoly: ${A} − 2Q = 2Q ⇒ Q<sub>m</sub> = ${Qm}, p<sub>m</sub> = ${pm}.`,`Efficient: p = MC ⇒ ${A} − Q = 2Q ⇒ Q<sub>e</sub> = ${f(Qe)}.`,`At Q<sub>m</sub>: price ${pm}, MC = ${2*Qm}. Gap: ${pm-2*Qm}.`,`DWL = ½·${pm-2*Qm}·${f(Qe-Qm)} = ${f(dwl)}.`,'!DWL triangle between demand and MC, from Q<sub>m</sub> to the efficient Q.']);}
]);
})();
