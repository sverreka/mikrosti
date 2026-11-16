// MikroSti question bank, part 5: extra theory (concept) questions for the units that had few.
// These also appear in the learning path. See questions-2.js for the format.
(function(){
const M=(q,o,e,st)=>({t:'mc',q,o,a:0,e,st});
const T=(q,a,e,st)=>({t:'tf',q,a,e,st});
const add=(u,qs)=>{ const M2=window.MORE_QS; M2[u]=(M2[u]||[]).concat(qs); };

add('u7',[
 M('Which of these is <b>not</b> an assumption of perfect competition?',['Firms face a downward-sloping demand curve for their own product','Many buyers and sellers','Identical (homogeneous) products','Free entry and exit'],'Under perfect competition each firm is a price taker: it faces a horizontal demand curve at the market price.',
  ['Perfect competition: many small firms, identical products, full information, free entry and exit.','Each firm is too small to affect the price.','So its own demand curve is horizontal at p, not downward-sloping.','!Price taker ⇔ horizontal firm demand ⇔ MR = p.']),
 M('Why is marginal revenue equal to the price for a competitive firm?',['Selling one more unit does not lower the price it gets on the other units','Because marginal cost is constant','Because the firm makes zero profit','Because demand is inelastic'],'A price taker can sell as much as it wants at the market price, so each extra unit adds exactly p to revenue.',
  ['Revenue: R = p·q with p given.','MR = dR/dq = p.','A monopoly must lower the price on all units to sell more, so its MR &lt; p.','!Competition: MR = p. Monopoly: MR &lt; p.']),
 T('Statement: In the short run, a competitive firm that makes a loss should always shut down.',false,'False. It should keep producing as long as the price covers average variable cost. Then revenue covers all variable costs and part of the fixed costs, which must be paid anyway.',
  ['Shutting down: loss = fixed cost.','Producing with p ≥ AVC: loss is smaller than the fixed cost.','So produce if p ≥ min AVC, even if p &lt; AC.','!Short run: shut down only if p &lt; min AVC.']),
 M('Demand for the product of a competitive industry increases permanently. What happens in the long run (constant-cost industry)?',['New firms enter and the price returns to min AC, with a larger total quantity','The price stays permanently higher','Existing firms earn positive profit forever','The number of firms falls'],'The short-run price rise creates profits, which attract entry until the price is back at min AC. Output is higher, produced by more firms.',
  ['Short run: price rises, existing firms earn profits.','Profits attract new firms, and market supply shifts right.','Entry continues until p = min AC again.','!Long run in a constant-cost industry: demand shifts change quantity and the number of firms, not the price.']),
 T('Statement: A competitive firm in long-run equilibrium produces at the minimum of its average cost curve.',true,'True. Free entry drives the price down to min AC, and the firm sets p = MC. MC crosses AC at its minimum, so the firm produces there.',
  ['Long run: p = MC (profit maximum) and p = AC (zero profit).','MC = AC only at the minimum of AC.','So output is at min AC: efficient scale.','!Long-run competition: p = MC = min AC.'])
]);

add('u8',[
 M('What is producer surplus?',['The difference between the revenue producers get and their variable cost (the area above supply and below the price)','Profit after fixed costs','Total revenue','The area below the demand curve'],'PS = revenue − variable cost. For the market, it is the area between the price and the supply curve.',
  ['Each unit is supplied at its marginal cost (on the supply curve).','The producer gets p, so the surplus on that unit is p − MC.','Summed over units: the area above supply, below p.','!PS = profit + fixed costs.']),
 M('Why does a tax create a deadweight loss?',['Some trades where buyers value the good more than it costs to produce no longer happen','The government wastes the revenue','Producers pay all of the tax','Prices fall'],'The tax drives a wedge between what buyers pay and sellers get, so quantity falls below the efficient level.',
  ['Before the tax: all units with willingness to pay ≥ MC are traded.','With the tax: buyers pay p + t, sellers get p, and quantity falls.','The lost units had value above cost: that gain disappears.','!DWL = value of trades that no longer happen.']),
 T('Statement: Who formally pays a tax to the government (buyers or sellers) determines who bears the burden.',false,'False. The incidence depends only on the elasticities of supply and demand. Taxing buyers or sellers gives the same prices and quantity.',
  ['A tax on sellers shifts supply up by t. A tax on buyers shifts demand down by t.','Both give the same quantity and the same wedge between the two prices.','The less elastic side bears more of the burden either way.','!Statutory incidence ≠ economic incidence.']),
 M('Which market is most likely to have <b>no</b> deadweight loss from a tax?',['One where demand is perfectly inelastic','One where demand is very elastic','One where supply is very elastic','Every tax has the same deadweight loss'],'If quantity does not respond to price, the tax changes no trades. The tax only moves money from buyers to the government.',
  ['DWL comes from the drop in quantity.','Perfectly inelastic demand: quantity stays the same whatever the price.','No lost trades ⇒ no deadweight loss. Buyers bear the whole tax.','!The less quantity responds, the smaller the deadweight loss.']),
 T('Statement: A binding price ceiling always makes consumers as a group better off.',false,'False. Consumers who still get the good pay less, but fewer units are sold. If the lost surplus on the units no longer sold is larger, consumers as a group lose.',
  ['Gain: lower price on the units still sold.','Loss: surplus on units no longer supplied.','Which is larger depends on the elasticities.','!Price ceilings help some consumers and hurt others.'])
]);

add('u10',[
 M('What is the main source of monopoly power?',['Barriers to entry that keep other firms out','A high price','A large number of buyers','Constant marginal cost'],'Without barriers to entry (patents, control of a key input, large economies of scale, government licenses), high profits would attract competitors.',
  ['A monopoly earns profits by setting p &gt; MC.','Profits would normally attract entry.','Barriers to entry let the monopoly keep its position.','!No barriers to entry ⇒ no lasting monopoly.']),
 M('Why is a monopoly’s marginal revenue below its price?',['To sell one more unit it must lower the price on all units it sells','Because its costs are higher','Because demand is perfectly elastic','Because of taxes'],'MR = p + Q·dp/dQ. The second term is negative because the monopoly faces downward-sloping demand.',
  ['Selling one more unit brings in p.','But the price on all earlier units falls by dp/dQ.','MR = p + Q·(dp/dQ) &lt; p.','!Linear demand p = a − bQ: MR = a − 2bQ, twice as steep.']),
 T('Statement: A monopoly charges the highest price consumers are willing to pay.',false,'False. It chooses the quantity where MR = MC and charges the price on the demand curve at that quantity. A higher price would sell too little to be profitable.',
  ['A very high price means very few sales.','The monopoly trades off a higher price against lower quantity.','The best trade-off is at MR = MC.','!Monopoly: highest profit, not highest price.']),
 M('What does perfect price discrimination do to welfare compared with a single-price monopoly?',['It removes the deadweight loss, but the monopoly captures all the surplus','It increases the deadweight loss','It gives all the surplus to consumers','It has no effect'],'Charging each consumer her willingness to pay makes it profitable to sell every unit with value above MC, so output is efficient. Consumer surplus is zero.',
  ['Each unit is sold at the buyer’s willingness to pay.','So MR = p for every unit, and the firm sells until p = MC.','Output is efficient (no DWL), but CS = 0.','!Efficient ≠ fair: perfect price discrimination gives everything to the firm.']),
 T('Statement: A monopolist that maximizes profit will never operate where demand is inelastic.',true,'True. Where demand is inelastic, MR &lt; 0. Cutting output would then raise revenue and lower cost, so profit would rise.',
  ['MR = p(1 + 1/ε).','Inelastic (|ε| &lt; 1) ⇒ MR &lt; 0.','But MC &gt; 0, so MR = MC is impossible there.','!Monopolies operate on the elastic part of demand.'])
]);

add('u12',[
 M('What distinguishes an oligopoly?',['A few firms whose decisions affect each other’s profits','Many small price-taking firms','One firm with no close substitutes','Free entry and zero profit'],'With few firms, each must take its rivals’ reactions into account: strategic interaction.',
  ['Monopoly: one firm. Perfect competition: many tiny firms.','Oligopoly: few firms, each large enough to affect the market price.','So game theory is the natural tool.','!Oligopoly = strategic interdependence.']),
 M('In the Cournot model, what does each firm take as given when choosing its quantity?',['The quantities of the other firms','The market price','The other firms’ prices','Its own marginal revenue'],'Each firm treats rivals’ output as fixed and picks its best response. The equilibrium is where all firms play best responses.',
  ['Firm 1 takes q<sub>2</sub> as given and maximizes its profit.','That gives its reaction function q<sub>1</sub>(q<sub>2</sub>).','Equilibrium: both reaction functions hold at once.','!Cournot = Nash equilibrium in quantities.']),
 T('Statement: In the Bertrand model with identical products and equal constant marginal costs, two firms are enough to reach the competitive outcome.',true,'True. Any price above MC can be undercut by the rival, who then takes the whole market. The only equilibrium is p = MC.',
  ['If p &gt; MC, the rival can charge slightly less and win all customers.','This continues until p = MC.','Profits are zero, as in perfect competition.','!Bertrand paradox: two firms are enough for p = MC.']),
 M('As the number of Cournot firms grows very large, what happens to the market outcome?',['It approaches perfect competition: price approaches MC','It approaches monopoly','The price rises','Output falls'],'Each firm’s markup is L = −1/(nε), which goes to zero as n grows.',
  ['Lerner index in Cournot: L = −1/(nε).','As n → ∞, L → 0, so p → MC.','Total output approaches the competitive output.','!More firms ⇒ less market power.']),
 T('Statement: Members of a cartel have an incentive to produce more than their agreed quota.',true,'True. At the cartel price, p &gt; MC for each member. Selling an extra unit at that price is profitable, as long as the others stick to the agreement.',
  ['The cartel restricts output to raise the price.','At that high price, each firm’s own MR from one extra unit is above its MC.','So each firm gains by cheating, which makes cartels unstable.','!Cartels are a prisoners’ dilemma.'])
]);
})();
