(function(){
  var sid=sessionStorage.getItem('appl_visitor_sid');
  if(!sid){sid='v_'+Math.random().toString(36).substr(2,12)+'_'+Date.now();sessionStorage.setItem('appl_visitor_sid',sid)}
  function beat(){
    var page=location.pathname.replace(/^\//,'').replace(/\.html$/,'')||'home';
    fetch('/api/presence',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session_id:sid,current_page:page})})
      .then(function(r){return r.json()})
      .then(function(d){if(d&&d.redirectTo){location.href=d.redirectTo}})
      .catch(function(){});
  }
  beat();
  setInterval(beat,5000);
})();
