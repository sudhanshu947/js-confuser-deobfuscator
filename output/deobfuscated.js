var _0x7DE558 = function () {
  var r = String.fromCharCode;
  var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var e = {};
  function t(_param_50, _param_51) {
    if (!e[_param_50]) {
      e[_param_50] = {};
      for (let _var_a0 = 0; _var_a0 < _param_50.length; _var_a0++) {
        e[_param_50][_param_50.charAt(_var_a0)] = _var_a0;
      }
    }
    return e[_param_50][_param_51];
  }
  let _var_69 = {
    compressToBase64: function (_param_52) {
      if (_param_52 == null) {
        return "";
      }
      let _var_a1 = _var_69._compress(_param_52, 6, function (_param_53) {
        return o.charAt(_param_53);
      });
      switch (_var_a1.length % 4) {
        default:
        case 0:
          return _var_a1;
        case 1:
          return _var_a1 + "===";
        case 2:
          return _var_a1 + "==";
        case 3:
          return _var_a1 + "=";
      }
    },
    decompressFromBase64: function (_param_54) {
      if (_param_54 == null) {
        return "";
      } else if (_param_54 == "") {
        return null;
      } else {
        return _var_69._decompress(_param_54.length, 32, function (_param_55) {
          return t(o, _param_54.charAt(_param_55));
        });
      }
    },
    compressToUTF16: function (_param_56) {
      if (_param_56 == null) {
        return "";
      } else {
        return _var_69._compress(_param_56, 15, function (_param_57) {
          return r(_param_57 + 32);
        }) + " ";
      }
    },
    decompressFromUTF16: function (_param_58) {
      if (_param_58 == null) {
        return "";
      } else if (_param_58 == "") {
        return null;
      } else {
        return _var_69._decompress(_param_58.length, 16384, function (_param_59) {
          return _param_58.charCodeAt(_param_59) - 32;
        });
      }
    },
    compressToUint8Array: function (_param_60) {
      var o = _var_69.compress(_param_60);
      var n = new Uint8Array(o.length * 2);
      for (var e = 0, t = o.length; e < t; e++) {
        let _var_a10 = o.charCodeAt(e);
        n[e * 2] = _var_a10 >>> 8;
        n[e * 2 + 1] = _var_a10 % 256;
      }
      return n;
    },
    decompressFromUint8Array: function (_param_61) {
      if (_param_61 == null) {
        return _var_69.decompress(_param_61);
      }
      var n = new Array(_param_61.length / 2);
      for (var e = 0, t = n.length; e < t; e++) {
        n[e] = _param_61[e * 2] * 256 + _param_61[e * 2 + 1];
      }
      let _var_a11 = [];
      n.forEach(function (_param_62) {
        _var_a11.push(r(_param_62));
      });
      return _var_69.decompress(_var_a11.join(""));
    },
    compressToEncodedURIComponent: function (_param_63) {
      if (_param_63 == null) {
        return "";
      } else {
        return _var_69._compress(_param_63, 6, function (_param_64) {
          return n.charAt(_param_64);
        });
      }
    },
    decompressFromEncodedURIComponent: function (_param_65) {
      if (_param_65 == null) {
        return "";
      } else if (_param_65 == "") {
        return null;
      } else {
        _param_65 = _param_65.replace(/ /g, "+");
        return _var_69._decompress(_param_65.length, 32, function (_param_66) {
          return t(n, _param_65.charAt(_param_66));
        });
      }
    },
    compress: function (_param_67) {
      return _var_69._compress(_param_67, 16, function (_param_68) {
        return r(_param_68);
      });
    },
    _compress: function (_param_69, _param_70, _param_71) {
      if (_param_69 == null) {
        return "";
      }
      var e;
      var t;
      var i;
      var s = {};
      var u = {};
      var a = "";
      var p = "";
      var c = "";
      var l = 2;
      var f = 3;
      var h = 2;
      var d = [];
      var m = 0;
      var v = 0;
      for (i = 0; i < _param_69.length; i += 1) {
        a = _param_69.charAt(i);
        if (!Object.prototype.hasOwnProperty.call(s, a)) {
          s[a] = f++;
          u[a] = true;
        }
        p = c + a;
        if (Object.prototype.hasOwnProperty.call(s, p)) {
          c = p;
        } else {
          if (Object.prototype.hasOwnProperty.call(u, c)) {
            if (c.charCodeAt(0) < 256) {
              for (e = 0; e < h; e++) {
                m <<= 1;
                if (v == _param_70 - 1) {
                  v = 0;
                  d.push(_param_71(m));
                  m = 0;
                } else {
                  v++;
                }
              }
              t = c.charCodeAt(0);
              e = 0;
              for (; e < 8; e++) {
                m = m << 1 | t & 1;
                if (v == _param_70 - 1) {
                  v = 0;
                  d.push(_param_71(m));
                  m = 0;
                } else {
                  v++;
                }
                t >>= 1;
              }
            } else {
              t = 1;
              e = 0;
              for (; e < h; e++) {
                m = m << 1 | t;
                if (v == _param_70 - 1) {
                  v = 0;
                  d.push(_param_71(m));
                  m = 0;
                } else {
                  v++;
                }
                t = 0;
              }
              t = c.charCodeAt(0);
              e = 0;
              for (; e < 16; e++) {
                m = m << 1 | t & 1;
                if (v == _param_70 - 1) {
                  v = 0;
                  d.push(_param_71(m));
                  m = 0;
                } else {
                  v++;
                }
                t >>= 1;
              }
            }
            if (--l == 0) {
              l = Math.pow(2, h);
              h++;
            }
            delete u[c];
          } else {
            t = s[c];
            e = 0;
            for (; e < h; e++) {
              m = m << 1 | t & 1;
              if (v == _param_70 - 1) {
                v = 0;
                d.push(_param_71(m));
                m = 0;
              } else {
                v++;
              }
              t >>= 1;
            }
          }
          if (--l == 0) {
            l = Math.pow(2, h);
            h++;
          }
          s[p] = f++;
          c = String(a);
        }
      }
      if (c !== "") {
        if (Object.prototype.hasOwnProperty.call(u, c)) {
          if (c.charCodeAt(0) < 256) {
            for (e = 0; e < h; e++) {
              m <<= 1;
              if (v == _param_70 - 1) {
                v = 0;
                d.push(_param_71(m));
                m = 0;
              } else {
                v++;
              }
            }
            t = c.charCodeAt(0);
            e = 0;
            for (; e < 8; e++) {
              m = m << 1 | t & 1;
              if (v == _param_70 - 1) {
                v = 0;
                d.push(_param_71(m));
                m = 0;
              } else {
                v++;
              }
              t >>= 1;
            }
          } else {
            t = 1;
            e = 0;
            for (; e < h; e++) {
              m = m << 1 | t;
              if (v == _param_70 - 1) {
                v = 0;
                d.push(_param_71(m));
                m = 0;
              } else {
                v++;
              }
              t = 0;
            }
            t = c.charCodeAt(0);
            e = 0;
            for (; e < 16; e++) {
              m = m << 1 | t & 1;
              if (v == _param_70 - 1) {
                v = 0;
                d.push(_param_71(m));
                m = 0;
              } else {
                v++;
              }
              t >>= 1;
            }
          }
          if (--l == 0) {
            l = Math.pow(2, h);
            h++;
          }
          delete u[c];
        } else {
          t = s[c];
          e = 0;
          for (; e < h; e++) {
            m = m << 1 | t & 1;
            if (v == _param_70 - 1) {
              v = 0;
              d.push(_param_71(m));
              m = 0;
            } else {
              v++;
            }
            t >>= 1;
          }
        }
        if (--l == 0) {
          l = Math.pow(2, h);
          h++;
        }
      }
      t = 2;
      e = 0;
      for (; e < h; e++) {
        m = m << 1 | t & 1;
        if (v == _param_70 - 1) {
          v = 0;
          d.push(_param_71(m));
          m = 0;
        } else {
          v++;
        }
        t >>= 1;
      }
      while (true) {
        m <<= 1;
        if (v == _param_70 - 1) {
          d.push(_param_71(m));
          break;
        }
        v++;
      }
      return d.join("");
    },
    decompress: function (_param_72) {
      if (_param_72 == null) {
        return "";
      } else if (_param_72 == "") {
        return null;
      } else {
        return _var_69._decompress(_param_72.length, 32768, function (_param_73) {
          return _param_72.charCodeAt(_param_73);
        });
      }
    },
    _decompress: function (_param_76, _param_75, _param_74) {
      var t;
      var i;
      var s;
      var u;
      var a;
      var p;
      var c;
      var l = [];
      var f = 4;
      var h = 4;
      var d = 3;
      var m = "";
      var v = [];
      var g = {
        val: _param_74(0),
        position: _param_75,
        index: 1
      };
      for (t = 0; t < 3; t += 1) {
        l[t] = t;
      }
      s = 0;
      a = Math.pow(2, 2);
      p = 1;
      while (p != a) {
        u = g.val & g.position;
        g.position >>= 1;
        if (g.position == 0) {
          g.position = _param_75;
          g.val = _param_74(g.index++);
        }
        s |= (u > 0 ? 1 : 0) * p;
        p <<= 1;
      }
      switch (s) {
        case 0:
          s = 0;
          a = Math.pow(2, 8);
          p = 1;
          while (p != a) {
            u = g.val & g.position;
            g.position >>= 1;
            if (g.position == 0) {
              g.position = _param_75;
              g.val = _param_74(g.index++);
            }
            s |= (u > 0 ? 1 : 0) * p;
            p <<= 1;
          }
          c = r(s);
          break;
        case 1:
          s = 0;
          a = Math.pow(2, 16);
          p = 1;
          while (p != a) {
            u = g.val & g.position;
            g.position >>= 1;
            if (g.position == 0) {
              g.position = _param_75;
              g.val = _param_74(g.index++);
            }
            s |= (u > 0 ? 1 : 0) * p;
            p <<= 1;
          }
          c = r(s);
          break;
        case 2:
          return "";
      }
      l[3] = c;
      i = c;
      v.push(c);
      while (true) {
        if (g.index > _param_76) {
          return "";
        }
        s = 0;
        a = Math.pow(2, d);
        p = 1;
        while (p != a) {
          u = g.val & g.position;
          g.position >>= 1;
          if (g.position == 0) {
            g.position = _param_75;
            g.val = _param_74(g.index++);
          }
          s |= (u > 0 ? 1 : 0) * p;
          p <<= 1;
        }
        switch (c = s) {
          case 0:
            s = 0;
            a = Math.pow(2, 8);
            p = 1;
            while (p != a) {
              u = g.val & g.position;
              g.position >>= 1;
              if (g.position == 0) {
                g.position = _param_75;
                g.val = _param_74(g.index++);
              }
              s |= (u > 0 ? 1 : 0) * p;
              p <<= 1;
            }
            l[h++] = r(s);
            c = h - 1;
            f--;
            break;
          case 1:
            s = 0;
            a = Math.pow(2, 16);
            p = 1;
            while (p != a) {
              u = g.val & g.position;
              g.position >>= 1;
              if (g.position == 0) {
                g.position = _param_75;
                g.val = _param_74(g.index++);
              }
              s |= (u > 0 ? 1 : 0) * p;
              p <<= 1;
            }
            l[h++] = r(s);
            c = h - 1;
            f--;
            break;
          case 2:
            return v.join("");
        }
        if (f == 0) {
          f = Math.pow(2, d);
          d++;
        }
        if (l[c]) {
          m = l[c];
        } else {
          if (c !== h) {
            return null;
          }
          m = i + i.charAt(0);
        }
        v.push(m);
        l[h++] = i + m.charAt(0);
        i = m;
        if (--f == 0) {
          f = Math.pow(2, d);
          d++;
        }
      }
    }
  };
  return _var_69;
}();
if (typeof define == "function" && define.amd) {
  define(function () {
    return _0x7DE558;
  });
} else if (typeof module != "undefined" && module != null) {
  module.exports = _0x7DE558;
} else if (typeof angular != "undefined" && angular != null) {
  angular.module("LZString", []).factory("LZString", function () {
    return _0x7DE558;
  });
}
var __p_TZ3Q_cache = {};
var __p_lNJn_array = ["nCYGG8wO_]FQ1qPj~@v!H*@%j]Qi/3", "w@+Z%|VKt@.rtJAl]Dj\"kYk/MA@K`:PPA9EU{1^y,uL|352AtR8|m;CU(TI", "y/]MU9,/J=tc>4v", "y1:oa$*Qw)gC<r54j\"qieS^%FuPF<PPQI/jLrY7", "$Dy\"T<KM@AXURO[Q+!C@D]m=5A:,]#", "D/N^A:?KFukHU`", "qj=@3_J+", "J41U%yjQ;)5/.r7j^B#oEt{Q.0$Wh1yNH],5v!G[8g#6M(;A}OTUV}sdmq", "lp0@>E>E(VxS1ruI|Fl|&;*K#", "N@+lRcN0ju", "F!\"BmE.$+9Kr88jXmYTG=Ua3", "Rt`ozrk]+DFkeEi>~dTGmSaQEVOL#`", "fcQzNfAAOq)<<Pq", "!tachNc\"uT,c^3)l1qja;(!Z3DyrXh8/24MURrvY)v^``ok4[CBG", "ZF@i#iKMDyzcqq(/A%ID", "i{Y!:PnMs=?Yq_CI81ez;6gQpq@UpqNOSt$!b&Ud5vRKTv\"dr@/U~", "^4iDAo3gekb<1yKd#BaMA", "Z@4UNt>+", "KVPWG[sUM0MhEr5WL7", "KO<S^!J9EY;J}$+/+wVMU\"auJJp=TOUXr;7@a$HG(Jl=+", "Kc;!zzEAgv|w7w%IT@bG/&a!GiVX!z_dvu}Y}19\"E)Lcy?mh:C~lzV=+", "~15^FJPKckj<M?9=hp&~T8<BHJu^N1p~n\"h@,idjXTw=iq]>mT/D]87", "zkSYKNX0N0W{C:>Ig!3L}o5v3u{?8`*$j4#BSCq0}@.r(#", "Zp36i%5+En\"V0lmh@@@XOJm$@A", "t`SY6!5.RT_,TqnN(=3\"HC3j<u", "D4CMkN!ZWwWQUJw~1Dec/1LZC)g6%y>A~pyg$fLMpk)y|#", "8k`L2920,A", "Z8T#7NLQ;VGt=(}d&c_M[[Xj<YSaRO[QK{LM", "d~6g}[Qg6ThQzCk4>=j6z4&/A00gul9B2{[!XU6GG0:o>hDI~!qG", ">paZL_#QVyw<|OzI;{$aMYn*+wh\"YhBZ8=:|;t`A`uEc55", "l@rGbUABDTYK(8h~%]OMxE6[;Jv<Rv/dtW*W&Si9EwqtN19B`uPW:;0uq)yV+", "va&12(j0$D#/&KE~]D9z!!=Y<gkrV8D", "Wu]\"AT!QuqxJM4nQf4Izoz=>=9J$zL($@\"KMdc0uSY1X)NyXg/lLv", "|ticyL;]+n{MCJ5AWdngj:dZ985/rv]$M/~6Ao9]N04<F(KlH+", "eIf#o6O6#", "L4OfhN=Bc=lQAo_l~Bt|+_LjzD", "Q!\"g4$dj_u&]yO^{I=WD", "\"C^lLC?yKw}HNEJ$S4*1Q]sU4yBLCL,W2~%G$$FZ~kQluEDAFFFlrFgUM^", "H/2|2tujOT5t2#)$z4)WaJ[G&yA`X:AFJD}|UL>]8=R", "Mj*Wu*q*CulTBC0j>~qWV\"SQyHBQPzSP$/,B]Y@Ua)u?|LXRC{%i{Jw+", "Kq*#uo)A<wf|nqs/}W=\"zznZ<9uLNL<I.M}5", "d`xlE(Nu&0i#Nl8Bw+", "1tmgi?BB3],cllsbb\"}!CI4ARk?wAotWV;la(}oZ]k]$v}%~", "1`=@TIeKH=lG(N#WL=#o]LI92VlL:JG4j~Wz)[nymk7t58@>od.z38K%G", "C`)ii\"&G`", "E\"SW9!wEn@Sa<3$O6T>l]}N3", "^zEDsxi6DkLr7", "rt>a$z~Z2=WWoOL~21j|R(5O%VYc.~;PF`>\"vNvANvZip~TRnF3", "X8bS}:R0byP", "`8^LPtMR(jsYgI;lx`Ra>9o%yTYON1g", "t`%X:1wvlJcHeE1W", "VCI@h_[9g{&9p3e>5]>@?SCdauVKKL44<W{BF(7", "]{IzST?u,8)S(CxWI`ZGC\">+", "r=9S1F~gL{e8.r<lw1t^l:x$B)fY<P;lZDIzrL./>qnqX1,4k7", ":4#5bU~3JqW^F52AMzKzPKiBG{dW&##ZA9(ijfVthup", "M@+Z@LT3", "<F`Br_UjK9tK5(^{%u&WP?>+xj6|7w?d~FRlzVJELyrjBhrQ\"7", ",\"H!lfjy$]#ttC[A;d`", "I@%SSN6[k]A6N#/Bl/9ztL}*gyA4mQ%A#B`", "3$`a1<9>RJES+", ":qBG9y!ZJ=EQK1X/,R>@L_?Q8Ya<*rvII1`", "388|`!Q3[@vktlJXyJ{|d$KdG", "N@alP4\"/=D<#X`", "G16~=1|&^qWQTziBq9SB5L0QDqqZI~^~itHBN@p$3u&w6P/$kdgM?N7", "@t`a\"rLQ(Jj6<wjl!k+@b[sdfg`vXldWLTnB.PI+A@{`_KTB<c+\"u", "7#rGV?*%BqVG^(BN@`dZv[g%Ej[rEy0j", "V`?ax1[>SgyJg`y/]{`BLFiv9YeaJq5Z", "\"W6B:1C%rv4[sqCdOt<c+LvGz]PW%40/w@gl&;TZ|q", "h91c<_W>k8soO#~X1C>69}C0b0&|ulfdj%`BE6!div\"jyzk=#t0cm:?%#", "\";7xaU7rHk~`+", ">u=@]8n*7j1wX1pA|TwZM8dU/0,j(N.B#9(W<1I_w9A<<1WBuj_@JLrjby8", ">/<Sp\">GCn3fTv|l`a/#l&_$BT}|.~dA", "J{Aa{fRU=wd", "+p!a.&U%|HD(+h1Ww@olTLZU%Y`60lyBDp.XK:9E#]D@*zv", "!H2|[!Iv#v3D:q,N{@`^(}2u$DHt*qQ>tF`", "B@#BMN\"$SHRJIy9=bt^BPVz>_ufONl<~#zY^3NEE;)q/1yCIVtu^d@@U,D", "p~ecq]j3aw\"n+", "A8wxqTnuuk&!Oz`p{+", "8d~LePlGgv#E8l[4kC\"Y@IB>~{73]C%~SW6Y8%Ny[vMyUwsX)k/ZJL9B5", "!VN|08rQa8frV`", "r{,5y}.GIvZk+Nhd8~m\"^]9\"Tg]G&Q]Ba`)W*]1[W)_w4CuPlF3", ".`MGd@=vU@g6Go=d<W9S~Pj*PyYS{`cW~8,B{", "X{BWATH+lT$QClu", "]@2^^Sau0Y0%APtj<\"s\"]9#Rhj", "y45GnLMgJHZSXL`ZLW@S6o@3", "M1F6WEeUz9]c#8GA=M=M|CSylT|9a1x4(@d\"gF~Zn]~Q$qu", "Zdf#c<<\"x@5{>L@Feg<#8r\"E(Y~i%(oF\"C?ae]AYA]18iPv", "XkgDy%m/VvZLW?]$}q8YH*Sy&v@", "t!GsA*P=", "VV$M!d+", "X8v^~", "g%.h4vbl", "5%4k", "]op+zzIl", "XG}+o.T", "lKe2V", "b]m;?aO8", "|XqQ8nP~", "@%qHEX{F", "j9&O", "Ku~BFa23", "Lr|Yj,98", "/r[%u]yF", "@siCa]jF", "mpX6`&WG", "[s?Iuy9G", ":)JMLt+F", "PeJHmqjF", "`}UJ\"EJG", "LT<fq?qG", "zLlcQZNF", "i&kj.>1G", "T.sI)qiF", "smGcwN1G", "ioBCly2F", "$>2H}NyF", "W2fL:};G", "@2Rk6N:F", "E<a8n>cG", "#DE%#{*G", "g>[%kyfF", ">*g*#1aG", "Wsb8HojF", "E`O*.1OG", "KLOCa%mG", "SkqHpV(G", "wkKS@&:F", "hIB*?EfF", "pw18!rOG", "7s}siy[F", "p8QwS>iF", "cKF*u?PF", "pmljm6NF", "pLI%podG", "q*\"8J1qG", "kMlL_}[F", "v&m=Ry]F", "OLnf7M)F", "2Y`w`E<G", "trM8i1dG", "jT4J6n*G", "#&:*6kEG", "&LkM=Z7F", "4*@}pDxF", "D.n9Z]1G", "Khmgw$bG", "VMhfNn$F", "JDZ8Jn;G", "gwCn%A|m", "ee*;},Im", "pQnL;8*m", "VeI,x2sm", "SMCPP8G", "s+t5Y>ym", "~QTNIZIm", "fqCDxf07", "8#>U=lU9", "YTUX", "(FU!efD+", "Mnt3gzAf", "=d,a>KP3", "F]aO^_{3"];
function __p_b0ZZ_getGlobal() {
  let _var_a13 = [function () {
    return globalThis;
  }, function () {
    return global;
  }, function () {
    return window;
  }, function () {
    return new Function("return this")();
  }];
  let _var_78 = undefined;
  let _var_79 = [];
  try {
    _var_78 = Object;
    _var_79.push("".__proto__.constructor.name);
  } catch (e) {}
  _0xC60E1F: for (let _var_80 = 0; _var_80 < _var_a13.length; _var_80++) {
    try {
      _var_78 = _var_a13[_var_80]();
      for (let _var_81 = 0; _var_81 < _var_79.length; _var_81++) {
        if (typeof _var_78[_var_79[_var_81]] === "undefined") {
          continue _0xC60E1F;
        }
      }
      return _var_78;
    } catch (e) {}
  }
  return _var_78 || this;
}
var __globalObject = __p_b0ZZ_getGlobal() || {};
var __TextDecoder = __globalObject.TextDecoder;
var __Uint8Array = __globalObject.Uint8Array;
var __Buffer = __globalObject.Buffer;
var __String = __globalObject.String || String;
var __Array = __globalObject.Array || Array;
var utf8ArrayToStr = function () {
  let _var_82 = new __Array(128);
  let _var_c7 = __String.fromCodePoint || __String.fromCharCode;
  let _var_d6 = [];
  return function (_param_80) {
    let _var_a14 = undefined;
    let _var_83 = undefined;
    let _var_84 = _param_80.length;
    _var_d6.length = 0;
    for (let _var_85 = 0; _var_85 < _var_84;) {
      _var_83 = _param_80[_var_85++];
      if (_var_83 <= 127) {
        _var_a14 = _var_83;
      } else if (_var_83 <= 223) {
        _var_a14 = (_var_83 & 31) << 6 | _param_80[_var_85++] & 63;
      } else if (_var_83 <= 239) {
        _var_a14 = (_var_83 & 15) << 12 | (_param_80[_var_85++] & 63) << 6 | _param_80[_var_85++] & 63;
      } else if (__String.fromCodePoint) {
        _var_a14 = (_var_83 & 7) << 18 | (_param_80[_var_85++] & 63) << 12 | (_param_80[_var_85++] & 63) << 6 | _param_80[_var_85++] & 63;
      } else {
        _var_a14 = 63;
        _var_85 += 3;
      }
      _var_d6.push(_var_82[_var_a14] ||= _var_c7(_var_a14));
    }
    return _var_d6.join("");
  };
}();
function __p_rGre_bufferToString(_param_81) {
  if (typeof __TextDecoder !== "undefined" && __TextDecoder) {
    return new __TextDecoder().decode(new __Uint8Array(_param_81));
  } else if (typeof __Buffer !== "undefined" && __Buffer) {
    return __Buffer.from(_param_81).toString("utf-8");
  } else {
    return utf8ArrayToStr(_param_81);
  }
}
function __p_epWo_dummyFunction() {}
function greet(name) {
  var output = "Hello " + name + "!";
  console.log(output);
}
greet("Internet User");