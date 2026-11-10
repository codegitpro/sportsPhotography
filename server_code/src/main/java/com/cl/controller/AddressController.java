package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.*;
import java.lang.*;
import java.math.*;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;
import com.cl.annotation.SysLog;

import com.cl.entity.AddressEntity;
import com.cl.entity.view.AddressView;

import com.cl.service.AddressService;
import com.cl.service.TokenService;

/**
 * 地址
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,AddressEntity address,
                                                                                                            HttpServletRequest request){
                                    if(!request.getSession().getAttribute("role").toString().equals("管理员")) {
                    address.setUserid((Long)request.getSession().getAttribute("userId"));
                }
                            EntityWrapper<AddressEntity> ew = new EntityWrapper<AddressEntity>();
                                                                                                                                                                        
        
        
        PageUtils page = addressService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, address), params), params));
        Map<String, String> deSens = new HashMap<>();
                                                                                                                                                                                //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }







    /**
     * 前端列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,AddressEntity address,
		HttpServletRequest request){
    	if(!request.getSession().getAttribute("role").toString().equals("管理员")) {
    		address.setUserid((Long)request.getSession().getAttribute("userId"));
    	}
        EntityWrapper<AddressEntity> ew = new EntityWrapper<AddressEntity>();

		PageUtils page = addressService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, address), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( AddressEntity address){
       	EntityWrapper<AddressEntity> ew = new EntityWrapper<AddressEntity>();
      	ew.allEq(MPUtil.allEQMapPre( address, MPUtil.camelToSnake("address")));
        return R.ok().put("data", addressService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(AddressEntity address){
        EntityWrapper< AddressEntity> ew = new EntityWrapper< AddressEntity>();
 		ew.allEq(MPUtil.allEQMapPre( address, MPUtil.camelToSnake("address")));
		AddressView addressView =  addressService.selectView(ew);
		return R.ok("查询地址成功").put("data", addressView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        AddressEntity address = addressService.selectById(id);
		address = addressService.selectView(new EntityWrapper<AddressEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(address,deSens);
        return R.ok().put("data", address);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        AddressEntity address = addressService.selectById(id);
		address = addressService.selectView(new EntityWrapper<AddressEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(address,deSens);
        return R.ok().put("data", address);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增地址")
    public R save(@RequestBody AddressEntity address, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(address);
        if(null == address.getUserid()){
            address.setUserid((Long) request.getSession().getAttribute("userId"));
        }
		Long userId = (Long)request.getSession().getAttribute("userId");
    	if(address.getIsdefault().equals("是")) {
    		addressService.updateForSet("isdefault='否'", new EntityWrapper<AddressEntity>().eq("userid", userId));
    	}
    	address.setUserid(userId);
        addressService.insert(address);
        return R.ok().put("data",address.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增地址")
    @RequestMapping("/add")
    public R add(@RequestBody AddressEntity address, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(address);
        if(null == address.getUserid()){
            address.setUserid((Long)request.getSession().getAttribute("userId"));
        }
		Long userId = (Long)request.getSession().getAttribute("userId");
    	if(address.getIsdefault().equals("是")) {
    		addressService.updateForSet("isdefault='否'", new EntityWrapper<AddressEntity>().eq("userid", userId));
    	}
    	address.setUserid(userId);
        addressService.insert(address);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改地址")
    public R update(@RequestBody AddressEntity address, HttpServletRequest request){
        //ValidatorUtils.validateEntity(address);
        if(address.getIsdefault().equals("是")) {
    		addressService.updateForSet("isdefault='否'", new EntityWrapper<AddressEntity>().eq("userid", request.getSession().getAttribute("userId")));
    	}
        addressService.updateById(address);//全部更新
        return R.ok();
    }



    
    /**
     * 获取默认地址
     */
    @RequestMapping("/default")
    public R defaultAddress(HttpServletRequest request){
    	Wrapper<AddressEntity> wrapper = new EntityWrapper<AddressEntity>().eq("isdefault", "是").eq("userid", request.getSession().getAttribute("userId"));
        AddressEntity address = addressService.selectOne(wrapper);
        return R.ok().put("data", address);
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除地址")
    public R delete(@RequestBody Long[] ids){
        addressService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	








}
