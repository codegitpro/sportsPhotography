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

import com.cl.entity.KaojisheyingyuyueEntity;
import com.cl.entity.view.KaojisheyingyuyueView;

import com.cl.service.KaojisheyingyuyueService;
import com.cl.service.TokenService;

/**
 * 考级摄影预约
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
@RestController
@RequestMapping("/kaojisheyingyuyue")
public class KaojisheyingyuyueController {
    @Autowired
    private KaojisheyingyuyueService kaojisheyingyuyueService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,KaojisheyingyuyueEntity kaojisheyingyuyue,
                                                                                                                                                HttpServletRequest request){
                    String tableName = request.getSession().getAttribute("tableName").toString();
                                                                                                                                                                                        if(tableName.equals("yonghu")) {
                    kaojisheyingyuyue.setYonghuzhanghao((String)request.getSession().getAttribute("username"));
                                    }
                                                                                                                                                                                                            EntityWrapper<KaojisheyingyuyueEntity> ew = new EntityWrapper<KaojisheyingyuyueEntity>();
                                                                                                                                                                                                                                    
        
        
        PageUtils page = kaojisheyingyuyueService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, kaojisheyingyuyue), params), params));
        Map<String, String> deSens = new HashMap<>();
                                                                                                                                                                                                                                            //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }







    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,KaojisheyingyuyueEntity kaojisheyingyuyue,
		HttpServletRequest request){
        EntityWrapper<KaojisheyingyuyueEntity> ew = new EntityWrapper<KaojisheyingyuyueEntity>();

		PageUtils page = kaojisheyingyuyueService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, kaojisheyingyuyue), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( KaojisheyingyuyueEntity kaojisheyingyuyue){
       	EntityWrapper<KaojisheyingyuyueEntity> ew = new EntityWrapper<KaojisheyingyuyueEntity>();
      	ew.allEq(MPUtil.allEQMapPre( kaojisheyingyuyue, MPUtil.camelToSnake("kaojisheyingyuyue")));
        return R.ok().put("data", kaojisheyingyuyueService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(KaojisheyingyuyueEntity kaojisheyingyuyue){
        EntityWrapper< KaojisheyingyuyueEntity> ew = new EntityWrapper< KaojisheyingyuyueEntity>();
 		ew.allEq(MPUtil.allEQMapPre( kaojisheyingyuyue, MPUtil.camelToSnake("kaojisheyingyuyue")));
		KaojisheyingyuyueView kaojisheyingyuyueView =  kaojisheyingyuyueService.selectView(ew);
		return R.ok("查询考级摄影预约成功").put("data", kaojisheyingyuyueView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        KaojisheyingyuyueEntity kaojisheyingyuyue = kaojisheyingyuyueService.selectById(id);
		kaojisheyingyuyue = kaojisheyingyuyueService.selectView(new EntityWrapper<KaojisheyingyuyueEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(kaojisheyingyuyue,deSens);
        return R.ok().put("data", kaojisheyingyuyue);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        KaojisheyingyuyueEntity kaojisheyingyuyue = kaojisheyingyuyueService.selectById(id);
		kaojisheyingyuyue = kaojisheyingyuyueService.selectView(new EntityWrapper<KaojisheyingyuyueEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(kaojisheyingyuyue,deSens);
        return R.ok().put("data", kaojisheyingyuyue);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增考级摄影预约")
    public R save(@RequestBody KaojisheyingyuyueEntity kaojisheyingyuyue, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(kaojisheyingyuyue);
        kaojisheyingyuyueService.insert(kaojisheyingyuyue);
        return R.ok().put("data",kaojisheyingyuyue.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增考级摄影预约")
    @RequestMapping("/add")
    public R add(@RequestBody KaojisheyingyuyueEntity kaojisheyingyuyue, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(kaojisheyingyuyue);
        kaojisheyingyuyueService.insert(kaojisheyingyuyue);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改考级摄影预约")
    public R update(@RequestBody KaojisheyingyuyueEntity kaojisheyingyuyue, HttpServletRequest request){
        //ValidatorUtils.validateEntity(kaojisheyingyuyue);
        kaojisheyingyuyueService.updateById(kaojisheyingyuyue);//全部更新
        return R.ok();
    }

    /**
     * 审核
     */
    @RequestMapping("/shBatch")
    @Transactional
    @SysLog("审核考级摄影预约")
    public R update(@RequestBody Long[] ids, @RequestParam String sfsh, @RequestParam String shhf){
        List<KaojisheyingyuyueEntity> list = new ArrayList<KaojisheyingyuyueEntity>();
        for(Long id : ids) {
            KaojisheyingyuyueEntity kaojisheyingyuyue = kaojisheyingyuyueService.selectById(id);
            kaojisheyingyuyue.setSfsh(sfsh);
            kaojisheyingyuyue.setShhf(shhf);
            list.add(kaojisheyingyuyue);
        }
        kaojisheyingyuyueService.updateBatchById(list);
        return R.ok();
    }


    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除考级摄影预约")
    public R delete(@RequestBody Long[] ids){
        kaojisheyingyuyueService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	








}
