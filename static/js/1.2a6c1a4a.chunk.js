(this["webpackJsonpreact-cms"]=this["webpackJsonpreact-cms"]||[]).push([[1],{387:function(e,a,t){"use strict";t.r(a);var n=t(19),l=t(373),c=t(1),r=t.n(c),o=t(9),i=t(330),s=t(338),m=t(339),u=t(365),d=t(383),g=t(359),p=t(360),E=t(361),h=t(385),f=t(379),b=t(384),x=t(380),y=t(336),k=t(340),O=t(237),j=t.n(O),v=t(381),C=t(382),N=t(341),w=t(375),D=t(376),P=t(377),S=t(378),B=t(386),z=t(368),_=(t(133),t(5)),A=t(309),I=t(131),R=t(250),T=t(374),q=t.n(T),F=Object(A.a)((function(e){return{root:{borderRadius:"4px",alignItems:"center",padding:e.spacing(1),display:"flex",flexBasis:420},icon:{marginRight:e.spacing(1),color:e.palette.text.secondary},input:{flexGrow:1,fontSize:"14px",lineHeight:"16px",letterSpacing:"-0.05px"}}})),J=function(e){var a=e.className,t=e.onChange,n=e.style,c=Object(l.a)(e,["className","onChange","style"]),o=F();return r.a.createElement(I.a,Object.assign({},c,{className:Object(_.a)(o.root,a),style:n}),r.a.createElement(q.a,{className:o.icon}),r.a.createElement(R.a,Object.assign({},c,{className:o.input,disableUnderline:!0,onChange:t})))},W=Object(i.a)((function(e){return{seeMore:{marginTop:e.spacing(3)},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{display:"flex",overflow:"auto",flexDirection:"column"},cardContent:{padding:0,textAlign:"center"},loader:{margin:"auto"},addButton:{height:"100%",float:"right"},imageCell:{backgroundSize:"cover",backgroundPosition:"center",height:"60px"}}}));function G(e){var a=e.onClose,t=e.open,n=Object(l.a)(e,["onClose","open"]);return r.a.createElement(g.a,Object.assign({disableBackdropClick:!0,disableEscapeKeyDown:!0,maxWidth:"xs","aria-labelledby":"confirmation-dialog-title",open:t},n),r.a.createElement(p.a,{dividers:!0},"Are you sure to delete this item? You will not be able to recover this"),r.a.createElement(E.a,null,r.a.createElement(k.a,{autoFocus:!0,onClick:function(e){return a("cancel")},color:"primary"},"Cancel"),r.a.createElement(k.a,{onClick:function(e){return a("ok")},color:"primary"},"Ok")))}var H=function(e){var a=e.columnNames,t=e.rows,l=e.loading,o=e.handleDelete,i=e.path,u=e.addItemText,d=e.searchBoxPlaceholder,g=W(),p=Object(c.useState)(10),E=Object(n.a)(p,2),h=E[0],f=E[1],b=Object(c.useState)(0),x=Object(n.a)(b,2),y=x[0],k=x[1],O=e.header?r.a.createElement(w.a,{title:e.header}):"";return r.a.createElement(s.a,{maxWidth:"lg",className:g.container},r.a.createElement(m.a,{container:!0,spacing:3},r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement(J,{placeholder:d||"search"})),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement(K,{text:u,link:e.path+"/add",className:g.addButton})),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(D.a,{className:g.paper},O,r.a.createElement(P.a,{className:g.cardContent},r.a.createElement(M,{columnNames:a,rows:t,loading:l,handleDelete:o,path:i})),r.a.createElement(S.a,{className:g.actions},r.a.createElement(B.a,{component:"div",count:e.requests?e.requests.length:0,onChangePage:function(e,a){k(a)},onChangeRowsPerPage:function(e){f(e.target.value)},page:y,rowsPerPage:h,rowsPerPageOptions:[5,10,25]}))))))},K=function(e){var a=e.text,t=e.link,n=e.className;return a?r.a.createElement(o.b,{to:t},r.a.createElement(k.a,{className:n,color:"primary",variant:"contained"},r.a.createElement(j.a,null),a)):""},M=function(e){var a=e.columnNames,t=e.rows,l=e.handleDelete,i=e.path,s=e.loading,m=W(),g=Object(c.useState)([]),p=Object(n.a)(g,2),E=p[0],k=p[1],O=[],j=[];return O=!t||s?r.a.createElement(x.a,null,r.a.createElement(f.a,{colSpan:a.length+2,className:"text-center py-4"},r.a.createElement(N.a,{className:m.loader}))):t.map((function(e,a){var t=e.columns.map((function(e,a){var t={};return e.width&&(t.width=e.width),e.type&&"image"===e.type?r.a.createElement(f.a,{key:e,padding:"none",style:t},r.a.createElement(u.a,{className:m.imageCell,style:{backgroundImage:"url("+e.url+")"}})):r.a.createElement(f.a,{key:a},e.text)}));return r.a.createElement(x.a,{key:a},r.a.createElement(f.a,null,r.a.createElement(z.a,{checked:-1!==E.indexOf(e._id),color:"primary",onChange:function(a){return function(e,a){var t=E.indexOf(a),n=[];-1===t?n=n.concat(E,a):0===t?n=n.concat(E.slice(1)):t===E.length-1?n=n.concat(E.slice(0,-1)):t>0&&(n=n.concat(E.slice(0,t),E.slice(t+1))),k(n)}(0,e._id)},value:"true"})),t,r.a.createElement(f.a,null,r.a.createElement(u.a,{display:"flex",justifyContent:"flex-end"},r.a.createElement(o.b,{to:i+"/edit/"+e._id},r.a.createElement(y.a,{color:"secondary",size:"small","aria-label":"Edit"},r.a.createElement(v.a,null))),r.a.createElement(y.a,{size:"small","aria-label":"Delete",className:"ml-2",onClick:function(a){return l(a,e._id)}},r.a.createElement(C.a,null)))))})),j.push(r.a.createElement(f.a,{key:-1},r.a.createElement(z.a,{checked:E.length===t.length,color:"primary",indeterminate:E.length>0&&E.length<t.length,onChange:function(e){var a,n=t;a=e.target.checked?n.map((function(e){return e._id})):[],k(a)}}))),a.map((function(e,a){j.push(r.a.createElement(f.a,{key:a},e))})),r.a.createElement(d.a,{size:"small"},r.a.createElement(b.a,null,r.a.createElement(x.a,null,j,r.a.createElement(f.a,{align:"right"},"Action"))),r.a.createElement(h.a,null,O))};a.default=function(e){var a=Object(c.useState)(!1),t=Object(n.a)(a,2),l=t[0],o=t[1],i=Object(c.useState)(null),s=Object(n.a)(i,2),m=s[0],u=s[1];return r.a.createElement(c.Fragment,null,r.a.createElement(H,Object.assign({},e,{handleDelete:function(e,a){o(!0),u(a)}})),r.a.createElement(G,{open:l,onClose:function(a){o(!1),"ok"===a&&e.onDelete&&e.onDelete(m)}}))}}}]);
//# sourceMappingURL=1.2a6c1a4a.chunk.js.map