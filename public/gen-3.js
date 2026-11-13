// Generators modeled on the fall 2021 (Covmed), 2022 (Jane, Denise) and 2023 (Norwegian Apples) exams.
(function(){
if(typeof GEN==='undefined') return;
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const r2=x=>Math.round(x*100)/100;
const f=x=>{const r=r2(x);return (r<0?'−':'')+Math.abs(r).toLocaleString('en-US',{maximumFractionDigits:2});};
const num=(q,a,tol,e,st)=>({t:'num',q,a,tol,e,st});
const add=(u,fns)=>{ GEN[u]=GEN[u]||[]; GEN[u].push(...fns); };

// Covmed-type monopoly: q = 2√L, capital fixed at K0, wage w = 4c ⇒ C(Q) = rK0 + cQ²
function covmed(){
  let c,w,r,K0,F,Q,A,P,pi;
  do{ c=pick([1,2,3,5]);w=4*c;r=pick([4,8,10,20]);K0=pick([50,100,200]);F=r*K0;Q=R(20,150);A=Q*(2+2*c);P=A-Q;pi=P*Q-c*Q*Q-F; }while(pi<=0);
  return {c,w,r,K0,F,Q,A,P,pi,txt:`A monopolist produces with q = 2L<sup>0.5</sup> in the short run, with capital fixed at K = ${K0}. The wage is w = ${w} and the rental rate is r = ${r}. Inverse demand is P = ${A} − Q.`};
}
add('u10',[
 ()=>{const m=covmed(),ask=pick(['P','pi']);
  const st=[`Labor needed: Q = 2√L ⇒ L = Q<sup>2</sup>/4. Cost: C = ${m.r}·${m.K0} + ${m.w}·Q<sup>2</sup>/4 = ${m.F} + ${m.c===1?'':m.c}Q<sup>2</sup>.`,`MR = ${m.A} − 2Q and MC = ${2*m.c}Q.`,`MR = MC: ${m.A} = ${2+2*m.c}Q ⇒ Q* = ${m.Q}, P* = ${m.A} − ${m.Q} = ${m.P}.`,`π = ${m.P}·${m.Q} − ${m.c===1?'':m.c+'·'}${m.Q}<sup>2</sup> − ${m.F} = ${f(m.pi)}.`,'!Short-run cost: invert the production function, fixed cost = r × fixed capital.'];
  return ask==='P'?num(m.txt+' What price does the monopolist charge?',m.P,0.01,`C = ${m.F} + ${m.c===1?'':m.c}Q<sup>2</sup>. MR = MC gives Q* = ${m.Q} and P* = ${m.P}.`,st)
                  :num(m.txt+' What is the monopolist’s profit?',m.pi,0.5,`Q* = ${m.Q}, P* = ${m.P}. π = ${f(m.pi)}.`,st);},
 ()=>{const m=covmed(),cs=0.5*m.Q*(m.A-m.P),ps=m.pi+m.F,w=cs+ps;
  return num(m.txt+` The monopolist produces Q* = ${m.Q} at P* = ${m.P}. What is welfare W = CS + PS?`,w,0.5,`CS = ½·${m.Q}·${m.A-m.P} = ${f(cs)}. PS = revenue − variable cost = ${f(ps)}. W = ${f(w)}.`,
   [`CS = ½·${m.Q}·(${m.A} − ${m.P}) = ${f(cs)}.`,`PS = profit + fixed cost = ${m.P}·${m.Q} − ${m.c===1?'':m.c+'·'}${m.Q}<sup>2</sup> = ${f(ps)}.`,`W = ${f(cs)} + ${f(ps)} = ${f(w)}.`,'!PS = profit + fixed cost.']);},
 ()=>{const m=covmed(),Qe=m.A/(1+2*m.c),ceil=m.A-Qe;
  return num(m.txt+' What price ceiling makes the monopolist produce the welfare-maximizing quantity? (two decimals)',r2(ceil),0.06,`Welfare maximum: ${m.A} − Q = ${2*m.c}Q ⇒ Q = ${f(Qe)}. Ceiling = ${m.A} − ${f(Qe)} = ${f(ceil)}.`,
   [`Cost: C = ${m.F} + ${m.c===1?'':m.c}Q<sup>2</sup>, so MC = ${2*m.c}Q.`,`Efficient: P = MC ⇒ ${m.A} − Q = ${2*m.c}Q ⇒ Q = ${f(Qe)}.`,`Set the ceiling at the demand price there: ${f(ceil)}.`,'!Optimal ceiling: where demand crosses MC.']);}
]);

// Covmed vs Epivac Cournot: firm C has cost F + cq², firm E has constant MC m
add('u12',[
 ()=>{let c,m,A,qc,qe;do{c=pick([2,3,5]);m=pick([50,100,150,200]);A=pick([800,1000,1200,1500]);
   qc=((A-(A-m)/2)/(2+2*c))/(1-1/(2*(2+2*c)));qe=(A-m-qc)/2;}while(qe<=0||qc<=0);
  const P=A-qc-qe,ask=pick(['qc','qe','P']),k=2+2*c;
  const q=`Cournot duopoly with inverse demand P = ${A} − q<sub>1</sub> − q<sub>2</sub>. Firm 1 has cost ${c}q<sub>1</sub><sup>2</sup> + 500. Firm 2 has constant marginal cost ${m}. `;
  const st=[`Firm 2: ${A} − q<sub>1</sub> − 2q<sub>2</sub> − ${m} = 0 ⇒ q<sub>2</sub> = ${(A-m)/2} − 0.5q<sub>1</sub>.`,`Firm 1: ${A} − 2q<sub>1</sub> − q<sub>2</sub> − ${2*c}q<sub>1</sub> = 0 ⇒ q<sub>1</sub> = (${A} − q<sub>2</sub>)/${k}.`,`Solve together: q<sub>1</sub> ≈ ${f(qc)}, q<sub>2</sub> ≈ ${f(qe)}.`,`P = ${A} − ${f(qc)} − ${f(qe)} ≈ ${f(P)}.`,'!Each firm’s FOC gives its best response. Solve them as a system.'];
  if(ask==='qc') return num(q+'What is firm 1’s Cournot output? (two decimals)',r2(qc),0.06,`Best responses: q<sub>2</sub> = ${(A-m)/2} − 0.5q<sub>1</sub>, q<sub>1</sub> = (${A} − q<sub>2</sub>)/${k}. q<sub>1</sub> ≈ ${f(qc)}.`,st);
  if(ask==='qe') return num(q+'What is firm 2’s Cournot output? (two decimals)',r2(qe),0.06,`q<sub>1</sub> ≈ ${f(qc)}, so q<sub>2</sub> = ${(A-m)/2} − 0.5·${f(qc)} ≈ ${f(qe)}.`,st);
  return num(q+'What is the market price in the Cournot equilibrium? (two decimals)',r2(P),0.06,`q<sub>1</sub> ≈ ${f(qc)}, q<sub>2</sub> ≈ ${f(qe)}, P ≈ ${f(P)}.`,st);}
]);

// Jane-type: U = q1^a q2 (exponents need not sum to 1); Denise-type: U = √q1 + √q2
add('u2',[
 ()=>{const a=pick([0.5,0.25,2,1]),Y=pick([60,90,120,150,180,240,300]),p1=pick([1,2,3,4,5]),p2=pick([1,2,3]),s=a/(a+1),ask=pick([1,2]);
  const q1=s*Y/p1,q2=(1-s)*Y/p2;
  return num(`U(q<sub>1</sub>, q<sub>2</sub>) = q<sub>1</sub><sup>${a}</sup>q<sub>2</sub>. Income is ${Y}, p<sub>1</sub> = ${p1} and p<sub>2</sub> = ${p2}. How much of good ${ask} is bought? (two decimals if needed)`,r2(ask===1?q1:q2),0.006,
   `Budget share of good 1: ${a}/(${a} + 1) = ${f(s)}. q<sub>1</sub> = ${f(s*Y)}/${p1} = ${f(q1)}, q<sub>2</sub> = ${f((1-s)*Y)}/${p2} = ${f(q2)}.`,
   [`MRS = −${a}q<sub>2</sub>/q<sub>1</sub> = −p<sub>1</sub>/p<sub>2</sub> ⇒ p<sub>2</sub>q<sub>2</sub> = (1/${a})·p<sub>1</sub>q<sub>1</sub>.`,`So the share of income on good 1 is ${a}/(${a} + 1) = ${f(s)}.`,`Spending: ${f(s*Y)} on good 1 and ${f((1-s)*Y)} on good 2.`,`q<sub>1</sub> = ${f(q1)}, q<sub>2</sub> = ${f(q2)}.`,'!Share = own exponent / sum of exponents.']);},
 ()=>{const p1=pick([1,2,3,4]),p2=pick([1,2,3,4,5]),Y=pick([60,120,180,240,300,360]),ask=pick([1,2]);
  const q1=Y*p2/(p1*(p1+p2)),q2=Y*p1/(p2*(p1+p2));
  return num(`U(q<sub>1</sub>, q<sub>2</sub>) = q<sub>1</sub><sup>0.5</sup> + q<sub>2</sub><sup>0.5</sup>. Income is ${Y}, p<sub>1</sub> = ${p1} and p<sub>2</sub> = ${p2}. How much of good ${ask} is bought? (two decimals if needed)`,r2(ask===1?q1:q2),0.006,
   `MRS = MRT gives q<sub>2</sub> = (${p1}/${p2})<sup>2</sup>q<sub>1</sub>. With the budget: q<sub>1</sub> = ${f(q1)}, q<sub>2</sub> = ${f(q2)}.`,
   ['MRS = −(q<sub>2</sub>/q<sub>1</sub>)<sup>0.5</sup>.',`MRS = MRT: (q<sub>2</sub>/q<sub>1</sub>)<sup>0.5</sup> = ${p1}/${p2} ⇒ q<sub>2</sub> = ${f((p1/p2)**2)}q<sub>1</sub>.`,`Budget: ${p1}q<sub>1</sub> + ${p2}·${f((p1/p2)**2)}q<sub>1</sub> = ${Y} ⇒ q<sub>1</sub> = ${f(q1)}.`,`q<sub>2</sub> = ${f(q2)}.`,'!Square-root utility: quantity ratio = (price ratio)<sup>2</sup>.']);}
]);

// Norwegian Apples-type: q = a(KL + L), cost minimization with w, r
add('u6',[
 ()=>{const a=pick([50,100,200]),w=pick([50,100,200]),k=pick([2,4,5]),r=k*w,m=R(3,20),q=a*k*m*m,K=m-1,L=k*m,C=w*L+r*K,ask=pick(['K','C']);
  const txt=`A firm produces with f(K, L) = ${a}KL + ${a}L. The wage is w = ${w} and the rental rate is r = ${r}. `;
  const st=[`MRTS = −MP<sub>L</sub>/MP<sub>K</sub> = −(K + 1)/L. Set equal to −w/r = −1/${k}: L = ${k}(K + 1).`,`Plug in: ${a}L(K + 1) = ${a*k}(K + 1)<sup>2</sup> = ${q} ⇒ K + 1 = ${m}.`,`K = ${K}, L = ${L}.`,`C = ${w}·${L} + ${r}·${K} = ${C}.`,'!Tangency (MRTS = −w/r), then plug into the isoquant. Check that K ≥ 0.'];
  return ask==='K'?num(txt+`How much capital K minimizes the cost of producing ${q}?`,K,0.01,`(K + 1)/L = ${w}/${r} gives L = ${k}(K + 1). Then K = ${K}.`,st)
                 :num(txt+`What is the lowest cost of producing ${q}?`,C,0.5,`K = ${K} and L = ${L}, so C = ${C}.`,st);}
]);
})();
