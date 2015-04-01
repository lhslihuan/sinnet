(function(doc, win) {
  'use strict';

  var top_bar = $('.menu-float');

  $(win).on('scroll', function() {
    if ($(doc).scrollTop() >= 726) {
      top_bar.addClass('show');
    } else {
      top_bar.removeClass('show');
    }
  })

  // service page
  // switch price by period
  var price_hour = ['0.056', '0.111', '0.222', '0.444', '0.889', '1.778', '3.556', '0.361', '0.722', '1.444', '2.889', '0.333', '0.667', '1.333', '2.667'],
    price_month = ['40.00', '80.00', '160.00', '320.00', '640.00', '1280.00', '2560.00', '260.00', '520.00', '1040.00', '2080.00', '240.00', '480.00', '960.00', '1920.00'];

  var price_list = $('.service-price .price');
  $('.service-price .btn').on('click', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    if ($(this).hasClass('hour')) {
      $('.service-price .btn').removeClass('selected');
      $(this).addClass('selected');
      price_list.each(function(index) {
        $(this).text('¥' + price_hour[index])
      })
    } else {
      $('.service-price .btn').removeClass('selected');
      $(this).addClass('selected');
      price_list.each(function(index) {
        $(this).text('¥' + price_month[index])
      })
    }
  })

  // production page
  var product_type = 'instance';
  $('.J_menu a').on('click', function(e) {
    e.preventDefault();
    var _type = $(this).attr('data-type');
    if (_type == product_type) {
      return;
    }
    $('.J_menu li').removeClass('selected');
    $('.J_menu a[data-type="' + _type + '"]').parent().addClass('selected');
    $('.' + product_type + '-container').addClass('hide');
    $('.' + _type + '-container').removeClass('hide');
    $('body').animate({
        scrollTop: 500
      },
      300);
    product_type = _type;

  });

  var priceObj = [{
    "name": "instance:compute-12",
    "ram": 12288,
    "vcpus": 12,
    "unit_price": "2.0000"
  }, {
    "name": "instance:compute-8",
    "ram": 8192,
    "vcpus": 8,
    "unit_price": "1.3330"
  }, {
    "name": "instance:compute-4",
    "ram": 4096,
    "vcpus": 4,
    "unit_price": "0.6670"
  }, {
    "name": "instance:compute-2",
    "ram": 2048,
    "vcpus": 2,
    "unit_price": "0.3330"
  }, {
    "name": "instance:memory-8",
    "ram": 32768,
    "vcpus": 8,
    "unit_price": "2.8890"
  }, {
    "name": "instance:memory-4",
    "ram": 16384,
    "vcpus": 4,
    "unit_price": "1.4440"
  }, {
    "name": "instance:memory-2",
    "ram": 8192,
    "vcpus": 2,
    "unit_price": "0.7220"
  }, {
    "name": "instance:memory-1",
    "ram": 4096,
    "vcpus": 1,
    "unit_price": "0.3610"
  }, {
    "name": "instance:standard-12",
    "ram": 24576,
    "vcpus": 12,
    "unit_price": "2.6670"
  }, {
    "name": "instance:standard-8",
    "ram": 16384,
    "vcpus": 8,
    "unit_price": "1.7780"
  }, {
    "name": "instance:standard-4",
    "ram": 8192,
    "vcpus": 4,
    "unit_price": "0.8890"
  }, {
    "name": "instance:standard-2",
    "ram": 4096,
    "vcpus": 2,
    "unit_price": "0.4440"
  }, {
    "name": "instance:standard-1",
    "ram": 2048,
    "vcpus": 1,
    "unit_price": "0.2220"
  }, {
    "name": "instance:micro-2",
    "ram": 1024,
    "vcpus": 1,
    "unit_price": "0.1110"
  }, {
    "name": "instance:micro-1",
    "ram": 512,
    "vcpus": 1,
    "unit_price": "0.0560"
  }, {
    "name": "instance:memory-12",
    "ram": 49152,
    "vcpus": 12,
    "unit_price": "4.3330"
  }, {
    "name": "instance:standard-16",
    "ram": 32768,
    "vcpus": 16,
    "unit_price": "3.5560"
  }];
  var routerPrice = {
    "name": "router",
    "unit_price": "0.0500"
  };
  var ipPrice = {
    "name": "ip.floating",
    "unit_price": "0.0300"
  };
  var voluemPrice = {
    "name": "volume.size",
    "unit_price": "0.0020"
  };
  var sataVolumePrice = {
    "name": "sata.volume.size",
    "unit_price": "0.0006"
  }
  var snapshotPrice = {
    "name": "snapshot.size",
    "unit_price": "0.0002"
  };

  var categories = [{
    "name": "micro",
    "label": "微型"
  }, {
    "name": "standard",
    "label": "标准型"
  }, {
    "name": "memory",
    "label": "内存型"
  }, {
    "name": "compute",
    "label": "计算型"
  }];
  var vcpus = [];
  var rams = [];
  priceObj.forEach(function(price) {
    var vcpu = price.vcpus;
    var ram = price.ram;
    if (ram && vcpu) {
      if (vcpus.indexOf(vcpu) < 0) {
        vcpus.push(vcpu);
      }
      if (rams.indexOf(ram) < 0) {
        rams.push(ram);
      }
    }
  });
  var s = function(a, b) {
    return a - b;
  }
  vcpus.sort(s);
  rams.sort(s);
  var blocks = {};
  var allData = [];

  var Slider = function(wrapper, min, max, unit, onChange) {
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.wrapper = wrapper;
    this.onChange = onChange;

    this.value = this.min;

    var html = [];
    var index = 0;
    html[index++] = '<div class="g-slider">';
    html[index++] = '<div class="track"><div class="hasValue"></div><div class="thumb"></div></div>';
    html[index++] = '<div class="numberPad">' + this.min + ' - ' + this.max + this.unit + '</div>';
    html[index++] = '<div class="resPad"><input type="text" value="" /><div class="unit">' + this.unit + '</div></div></div>';

    this.wrapper.html(html.join(''));
    var that = this;
    this.x = 0;
    this.thumbnail = this.wrapper.find('.thumb');
    this.onDragging = false;
    this.thumbnail.mousedown(function(e) {
      that.x = e.offsetX;
      that.onDragging = true;
      e.preventDefault();
    });

    $(document).on('mouseup', function() {
      that.onDragging = false;
    });

    $(document).on('mousemove', function(e) {
      if (that.thumbnail && that.onDragging) {
        var o2 = that.thumbnail.parent().offset();
        var pos = e.pageX - o2.left - that.x;

        var v = Math.round(pos / 490 * (that.max - that.min) + that.min);
        that.setValue(v);
      }
    });
    this.wrapper.find('input').blur(function(e) {
      var v = parseInt($(this).val(), 10);
      if (!isNaN(v)) {
        that.setValue(v);
      }
      e.preventDefault();
    });
  }

  Slider.prototype = {
    setValue: function(v) {
      if (v < this.min) {
        v = this.min;
      }
      if (v > this.max) {
        v = this.max;
      }
      var pos = (v - this.min) / (this.max - this.min) * 490;
      this.thumbnail.css({
        left: pos - 6
      });
      this.wrapper.find('input').val(v);
      this.wrapper.find('.hasValue').width(pos);
      this.value = v;
      if (this.onChange) {
        this.onChange(v);
      }
    }
  }


  var Calcalutor = function() {
    this.instance = null;
    this.instanceNumber = 0;
    this.instancePrice = 0;
    this.volume = null;
    this.volumeNumber = 0;
    this.volumePrice = 0;
    this.sataVolume = null;
    this.sataVolumeNumber = 0;
    this.sataVolumePrice = 0;
    this.router = null;
    this.routerNumber = 0;
    this.routerPrice = 0;
    this.ip = null;
    this.ipNumber = 0;
    this.ipPrice = 0;
    this.currentVpu = null;
    this.currentRam = null;
    this.total = 0;
  }

  Calcalutor.prototype = {
    setTotal: function() {
      this.total = this.instancePrice * this.instanceNumber + this.volumePrice * this.volumeNumber + this.ipPrice * this.ipNumber + this.routerPrice * this.routerNumber + this.sataVolumePrice * this.sataVolumeNumber;
      $('.pricingItems .total strong').text(this.toMonth(this.total).toFixed(2));
    },
    setInstance: function(obj) {
      this.instance = obj;
      if (this.instanceNumber == 0 || isNaN(this.instanceNumber)) {
        this.setInstanceNumber(1);
      } else {
        this.setInstanceNumber(this.instanceNumber);
      }
      this.setPrice('instance', obj.unit_price);

      var flavor = '';
      if (/micro/.test(obj.name)) {
        flavor += '微型 ';
      } else if (/compute/.test(obj.name)) {
        flavor += '计算型 ';
      } else if (/standard/.test(obj.name)) {
        flavor += '标准型 ';
      } else if (/memory/.test(obj.name)) {
        flavor += '内存型 ';
      }
      flavor += obj.vcpus + 'vCPU ';

      if (obj.ram < 1024) {
        flavor += obj.ram + 'M';
      } else {
        flavor += Math.round(obj.ram / 1024) + 'G';
      }
      $('.pricingItems >ul >li:eq(0) h2').text(flavor);

    },
    setInstanceNumber: function(count) {
      if (count < 1) {
        count = 1;
      }
      this.instanceNumber = count;
      this.instancePrice = parseFloat(this.instance.unit_price);
      var v = this.toMonth(parseFloat(this.instance.unit_price) * count).toFixed(2);
      var p = $('.pricingItems ul li:eq(0)');
      p.find('.pricing strong').text(v);
      p.find('input').val(count);
      this.setTotal();

    },
    setVolume: function(size) {
      this.volume = size;
      if (this.volumeNumber < 0 || isNaN(this.volumeNumber)) {
        this.setVolumeNumber(0);
      } else {
        this.setVolumeNumber(this.volumeNumber);
      }
      this.setPrice('volume', voluemPrice.unit_price * size);
      $('.pricingItems >ul >li:eq(1) h2').text(size + 'GB');
    },
    setVolumeNumber: function(count) {
      this.volumeNumber = count;
      this.volumePrice = parseFloat(voluemPrice.unit_price) * this.volume;
      var v = this.toMonth(parseFloat(voluemPrice.unit_price) * this.volume * count).toFixed(2);
      var p = $('.pricingItems ul li:eq(1)');
      p.find('.pricing strong').text(v);
      p.find('input').val(count);
      this.setTotal();

    },
    setSataVolume: function(size) {
      this.sataVolume = size;
      if (this.sataVolumeNumber < 0 || isNaN(this.sataVolumeNumber)) {
        this.setSataVolumeNumber(0);
      } else {
        this.setSataVolumeNumber(this.sataVolumeNumber);
      }
      this.setPrice('sataVolume', sataVolumePrice.unit_price * size);
      $('.pricingItems >ul >li:eq(2) h2').text(size + 'GB');
    },
    setSataVolumeNumber: function(count) {
      this.sataVolumeNumber = count;
      this.sataVolumePrice = parseFloat(sataVolumePrice.unit_price) * this.sataVolume;
      var v = this.toMonth(parseFloat(sataVolumePrice.unit_price) * this.sataVolume * count).toFixed(2);
      var p = $('.pricingItems ul li:eq(2)');
      p.find('.pricing strong').text(v);
      p.find('input').val(count);
      this.setTotal();

    },
    setIP: function(size) {
      this.ip = size;
      if (this.ipNumber < 0 || isNaN(this.ipNumber)) {
        this.setIPNumber(0);
      } else {
        this.setIPNumber(this.ipNumber);
      }
      this.setPrice('ip', ipPrice.unit_price * size);
      $('.pricingItems >ul >li:eq(3) h2').text(size + 'Mbps');
    },
    setIPNumber: function(count) {
      this.ipNumber = count;
      this.ipPrice = parseFloat(ipPrice.unit_price) * this.ip;
      var v = this.toMonth(parseFloat(ipPrice.unit_price) * this.ip * count).toFixed(2);
      var p = $('.pricingItems ul li:eq(3)');
      p.find('.pricing strong').text(v);
      p.find('input').val(count);
      this.setTotal();

    },
    setRouter: function(size) {
      this.router = size;
      if (this.routerNumber < 0 || isNaN(this.routerNumber)) {
        this.setRouterNumber(0);
      } else {
        this.setRouterNumber(this.routerNumber);
      }
      this.setPrice('router', routerPrice.unit_price * size);
      $('.pricingItems >ul >li:eq(4) h2').text('路由器');

    },
    setRouterNumber: function(count) {
      this.routerNumber = count;
      this.routerPrice = parseFloat(routerPrice.unit_price) * this.router;
      var v = this.toMonth(parseFloat(routerPrice.unit_price) * this.router * count).toFixed(2);
      var p = $('.pricingItems ul li:eq(4)');
      p.find('.pricing strong').text(v);
      p.find('input').val(count);
      this.setTotal();

    },
    setPrice: function(type, value) {
      var v = parseFloat(value);
      var res = $('.res[data-vtype="' + type + '"]');
      res.find('span:eq(0) strong').text(this.toMonth(v).toFixed(2));
      res.find('span:eq(1) strong').text(this.toHour(v).toFixed(4));
    },
    toMonth: function(v) {
      return v * 24 * 30;
    },
    toHour: function(v) {
      return v;
    }
  }
  var c = new Calcalutor();
  $('.interactiveArea').on('click', '.options.vcpu a', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.interactiveArea .options.vcpu a').removeClass('selected');
    $(this).addClass('selected');
    // Get valid CPU.
    $('.interactiveArea .options.ram >li >a').addClass('hide');
    var type = parseInt($(this).data('vcpu'), 10);

    var allData = [];
    priceObj.forEach(function(price) {
      if (price.vcpus == type) {
        allData.push(price);
      }
    });
    var activeRam = [];
    allData.forEach(function(o) {
      if (activeRam.indexOf(o.ram) < 0) {
        activeRam.push(o.ram);
      }
    });
    var str = [];
    activeRam.forEach(function(ram, idx) {
      str[idx] = 'a[data-ram="' + ram + '"]';
    });

    $('.interactiveArea .options.ram').find(str.join(', ')).removeClass('hide');
    c.currentVpu = type;

    $('.options.ram a:visible').removeClass('selected').eq(0).trigger('click');

  });

  $('.interactiveArea').on('click', '.options.ram a', function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.interactiveArea .options.ram a').removeClass('selected');
    $(this).addClass('selected');
    var type = parseInt($(this).data('ram'), 10);
    c.currentRam = type;

    priceObj.forEach(function(price) {
      if (price.vcpus == c.currentVpu && price.ram == c.currentRam) {
        c.setInstance(price);
      }
    });
  });
  $('.interactiveArea').each(function(index) {
    switch (index) {
      case 0:
        // Generate the instance tab.
        priceObj.forEach(function(price) {
          var name = price.name;
          if (name.indexOf('instance') >= 0) {
            name = name.replace('instance:', '');
            var a = name.split('-');
            if (a.length < 2) {
              return;
            }
            var type = a[0];
            if (!blocks[type]) {
              blocks[type] = [price];
            } else {
              blocks[type].push(price);
            }

          }
        });
        var html = [];
        var index = 0;
        html[index++] = '</ul><ul class="vcpu options">';
        vcpus.forEach(function(vcpu) {
          html[index++] = '<li class="option"><a href="javascript:;" class="tab" data-vcpu="' + vcpu + '">';
          html[index++] = vcpu + ' vCPU';
          html[index++] = '</a></li>';
        });
        html[index++] = '</ul><ul class="ram options">';
        rams.forEach(function(ram) {
          var value = ram + 'M';
          if (ram >= 1024) {
            value = Math.round(ram / 1024) + 'G';
          }
          html[index++] = '<li class="option"><a href="javascript:;" class="tab hide" data-ram="' + ram + '">';
          html[index++] = value;
          html[index++] = '</a></li>';
        });
        html[index++] = '</ul>';

        $(this).html(html.join(''));
        $(this).addClass('instance');
        $(this).siblings('.res').attr('data-vtype', 'instance');
        $('.options.vcpu a').eq(0).trigger('click');
        break;
      case 1:
        // Volume
        var html = '<div class="sliderArea"></div><div class="ioArea"><div class="v iops"><div><strong>IOPS</strong> 1500 - 6000 IOPS</div><div class="graph"><div class="on"></div></div><div class="value"><strong></strong> IOPS</div></div><div class="v throughout"><div class="graph"><div class="on"></div></div><div><strong>吞吐量</strong> 80 - 170 MB/s</div><div class="value"><strong></strong> MB/s</div></div>';
        $(this).html(html);
        var that = $(this);
        var s = new Slider($(this).find('.sliderArea'), 10, 1000, 'GB', function(value) {
          var iops = 1500;
          var throughout = 80;
          if (value > 100) {
            iops = Math.round(5 * value + 1000);
            throughout = Math.round(0.1 * value + 70);
          }
          var w1 = that.find('.iops');
          w1.find('.value strong').text(iops);
          w1.find('.on').width(Math.round(iops * 49 / 450 - 490 / 3));
          var w2 = that.find('.throughout');
          w2.find('.value strong').text(throughout);
          w2.find('.on').width(Math.round((throughout - 80) * 49 / 9));

          c.setVolume(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'volume');
        s.setValue(10);
        break;
      case 2:
        // Volume
        var html = '<div class="sliderArea"></div>';
        $(this).html(html);
        var that = $(this);
        var s = new Slider($(this).find('.sliderArea'), 10, 1000, 'GB', function(value) {
          c.setSataVolume(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'sataVolume');
        s.setValue(10);
        break;
      case 3:
        // Volume
        var html = '<div class="sliderArea"></div>';
        $(this).html(html);
        var that = $(this);
        var s = new Slider($(this).find('.sliderArea'), 1, 30, 'M', function(value) {
          c.setIP(value);
        });
        $(this).siblings('.res').attr('data-vtype', 'ip');
        s.setValue(1);
        break;
      case 4:
        $(this).siblings('.res').attr('data-vtype', 'router');
        c.setRouter(1);
        break;
      case 5:
        $(this).siblings('.res').attr('data-vtype', 'snapshot');
        c.setPrice('snapshot', snapshotPrice.unit_price);
        break;

    }
  });

  $('.pricingTab li a').click(function() {
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.pricingTab li a.selected').removeClass('selected');
    var p = $(this).parent();
    $(this).addClass('selected');
    var post = $('.pricingContent .content >li').eq(p.index()).position();
    $('.pricingContent .content').css({
      left: -post.left
    });
  });
  $('.service-price').on('click', '.count >a', function() {
    var step = $(this).hasClass('add') ? 1 : -1;
    var input = $(this).siblings('input');
    var v = parseInt(input.val(), 10);
    var newValue = v + step;
    input.val(newValue);
    input.trigger('blur');
  });
  $('.service-price').on('blur', '.count input', function() {
    var v = $(this).val();
    if (isNaN(v) || v < 0) {
      v = 0;
      $(this).val(v);
    }
    if (v != $(this).val()) {
      $(this).val(v);
    }
    var type = $(this).data('type');
    var f = 'set' + type + 'Number';
    if (c[f]) {
      c[f].apply(c, [v]);
    }
    $(this).parent().removeClass('active');
  });
  $('.service-price').on('focus', '.count input', function() {
    $(this).parent().addClass('active');
  });
  $('.service-price').on('click', '.pricingItems ul li h2', function() {
    var type = $(this).data('type');
    var idx = 0;
    switch (type) {
      case 'Instance':
        idx = 0;
        break;
      case 'Volume':
        idx = 1;
        break;
      case 'SataVolume':
        idx = 2;
        break;
      case 'IP':
        idx = 3;
        break;
      case 'Router':
        idx = 4;
        break;
    }
    $('.service-price .pricingTab li:eq(' + idx + ') a').trigger('click');
  });

})(document, window);